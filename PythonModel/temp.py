from flask import Flask, request
import os
from moviepy.editor import VideoFileClip
from moviepy.video.fx.resize import resize
from flask_cors import CORS
from imutils.video import FPS
import numpy as np
from datetime import datetime
import cv2
import os
import time
import pandas as pd
from openpyxl.workbook import Workbook
from tensorflow import keras
import argparse
from flask import request
from flask import Flask

# from fatigue_detect import * 


app = Flask(__name__)
CORS(app)


@app.route('/api/upload', methods=['POST'])
def config_yolo():
    """
    Configures the pretrained YOLO model
    @return ln: output layers of YOLO model 
    @return net: YOLO model 
    @return labels: class labels yolo model detects 
    """
    # find labels for YOLO model
    labelsPath = os.path.sep.join(["config", "obj.names"])
    labels = open(labelsPath).read().strip().split("\n")
    # path to weights and config file
    weightsPath = os.path.sep.join(["config", "yolov4-tiny_obj_best.weights"])
    configPath = os.path.sep.join(["config", "yolov4-tiny_obj.cfg"])
    # construct model
    net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)
    ln = net.getLayerNames()

    # print(type(net.getUnconnectedOutLayers()))
    # ln = [1, 2, 3]  # Example lst, replace with your actual list
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

    print("YOLO model loaded...")
    return ln, net, labels


def detect(frame, net, ln):
    """
    Uses YOLO model to detect eye/mouth clourse and face
    @param frame: current frame being processed
    @param net: YOLO model 
    @param ln: output layers of YOLO model 
    @return classIDs: IDs of classes detected on frame 
    @return boxes: bounding box corrdinates 
    @return idxs: list of bounding boxes that passed NMS 
    @return confidences: Confidence score of classes
    """
    # construct a blob from the input frame
    # pass it to the YOLO object detector
    # which will give bounding boxes and probabilities
    blob = cv2.dnn.blobFromImage(
        frame, 1 / 255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    layerOutputs = net.forward(ln)
    # initialize our lists of detected bounding boxes, confidences and class IDs
    boxes = []
    confidences = []
    classIDs = []
    # loop over each of the layer outputs
    for output in layerOutputs:
        # loop over each of the detections
        for detection in output:
            # extract the class ID and confidence
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            # filter out weak predictions by ensuring the detected (based on threshold of 0.4) -- threshold can be changed
            if confidence > 0.4:
                # scale the bounding box coordinates back relative to the size of the image
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                # use the center (x, y) coordinates to derive the top
                # and and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))
                # update our list of bounding box coordinates,
                # confidences, and class IDs
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)
    # apply non-maxima suppression to suppress weak overlapping bounding boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.5)
    return classIDs, boxes, idxs, confidences


def config_LSTM():
    """
    Load and configure the saved LSTM models
    @return LSTM_model: LSTM model for fatigue detection
    @return LSTM_eye: LSTM that detects eye closure 
    @return LSTM_yawn: LSTM model that detects yawn 
    """
    LSTM_model = keras.models.load_model('model_dense300')
    LSTM_eye = keras.models.load_model('model_eye')
    LSTM_yawn = keras.models.load_model('model_yawn')
    return LSTM_model, LSTM_eye, LSTM_yawn


def predict_fatigue(YOLOinput, lag_val):
    """
    Predicts fatigue level using LSTM model
    @param YOLOinput: input data from the YOLO model
    @param lag_val: how many previous eye and mouth clousre values are used for the LSTM model 
    @return fatigue_level: predicted fatigue level supplied from LSTM results   
    """
    global LSTM_model
    # convert LSTM_input from list into numpy array
    LSTM_input_arr = np.array(YOLOinput)
    # reshape to feed into LSTM model
    LSTM_input_arr = LSTM_input_arr.reshape((1, 1, lag_val*2))
    # feed into LSTM model
    LSTM_output = LSTM_model.predict(LSTM_input_arr, verbose=0)
    # get predicted class from LSTM model
    prediction = np.argmax(LSTM_output)
    if prediction == 0:
        fatigue_level = "Low"
    elif prediction == 1:
        fatigue_level = "Medium"
    elif prediction == 2:
        fatigue_level = "High"
    else:
        fatigue_level = "Error"
    return fatigue_level


def predict_eye(YOLOinput_eye, lag_val):
    """
    Predicts if drivers eyes have been closed for an extended period of time 
    @param YOLOinput_eye: input data from the YOLO model
    @param lag_val: how many previous eye and mouth clousre values are used for the LSTM model 
    @return eye_closed: if eyes have been closed for long period of time or not  
    """
    global LSTM_eye
    # convert LSTM_input from list into numpy array
    LSTM_input_arr = np.array(YOLOinput_eye)
    # reshape to feed into LSTM model
    LSTM_input_arr = LSTM_input_arr.reshape((1, 1, lag_val))
    # feed into LSTM model
    LSTM_output = LSTM_eye.predict(LSTM_input_arr, verbose=0)
    # if lstm model result <0.5 (threshold)
    if LSTM_output < 0.5:
        # no eye closure detected
        eye_closure = None
    elif LSTM_output >= 0.5:
        # else detected
        eye_closure = "Extended Eye Closure"
    else:
        eye_closure = "Error"
    return eye_closure


def predict_yawn(YOLOinput_yawn, lag_val):
    """
    Predicts if drivers eyes have been closed for an extnded period of time 
    @param YOLOinput_yawn: input data from the YOLO model
    @param lag_val: how many previous eye and mouth clousre values are used for the LSTM model 
    @return yawn: if driver is yawning 
    """
    global LSTM_yawn
    # convert LSTM_input from list into numpy array
    LSTM_input_arr = np.array(YOLOinput_yawn)
    # reshape to feed into LSTM model
    LSTM_input_arr = LSTM_input_arr.reshape((1, 1, lag_val))
    # feed into LSTM model
    LSTM_output = LSTM_yawn.predict(LSTM_input_arr, verbose=0)
    # if lstm model result <0.65 (threshold)
    if LSTM_output < 0.65:
        # no yawn detected
        yawn = None
    elif LSTM_output >= 0.65:
        # eslse detected
        yawn = "Yawn detected"
    else:
        yawn = "Error"
    return yawn


def calculatePERLOS(eyeClosed, totalTime):
    return (eyeClosed/totalTime) * 100


def calculatePOM(mouthOpen, totalTime):
    return (mouthOpen/totalTime) * 100


def run_yolo(lag_val, eye_lag_val, yawn_lag_val):
    eyesClosedLst = []
    mouthOpenLst = []
    """
    Runs the YOLO model, fed data to LSTM models, gets output from the LSTM model and writes output to the frame
    @param lag_val: how many previous eye and mouth clousre values are used for the 
    """
    while True:
        # declare global variables
        global frame_count, W, H, writer, eye_closed_count, mouth_open_count, mouth_open_sec, eye_closed_sec, LSTM_input, fatigue_result, start_eye, start_mouth, yawn_result, eye_close_result, LSTM_eye_input, LSTM_yawn_input
        # read frame
        (grabbed, frame) = vs.read()
        # if no frame, video is over
        if not grabbed:
            break
        # else increase the frame count
        frame_count = frame_count+1
        # and get frame width and hieght
        if W is None or H is None:
            (H, W) = frame.shape[:2]
        # detect using YOLO
        classIDs, boxes, idxs, confidences = detect(frame, net, ln)
        # if eye closed detected
        if 3 in classIDs:
            # update how long the eyes have been closed
            eye_closed_sec = time.time()-start_eye+eye_closed_sec
            # increase eye closed count
            eye_closed_count = eye_closed_count+1
            # print(eye_closed_count)
        else:
            # eyes are not closed, reset value
            eyesClosedLst.append(eye_closed_sec)
            eye_closed_sec = 0
        # if mouth is open
        if 0 in classIDs:
            # update how long the mouth has been open
            mouth_open_sec = time.time()-start_mouth+mouth_open_sec
            # increase mouth open count
            mouth_open_count = mouth_open_count+1
        else:
            # mouth is not opened, reset value
            if mouth_open_sec >= 1:
                mouthOpenLst.append(mouth_open_sec)
            mouth_open_sec = 0
        # every 5 frames monitior eye and mouth clourse times
        if frame_count % 5 == 0:
            # append into list for LSTM data
            LSTM_input.append(float(eye_closed_count))
            LSTM_input.append(float(mouth_open_count))
            LSTM_eye_input.append(float(eye_closed_count))
            LSTM_yawn_input.append(float(mouth_open_count))
            # DETECT FATIGUE
            # if the YOLo model has supplied enough results for fatigue detection
            if len(LSTM_input) == (lag_val*2):
                # send to LSTM model to predict
                fatigue_result = predict_fatigue(LSTM_input, lag_val)
            # if the YOLO model has supplied more than the number of previous values required
            if len(LSTM_input) > (lag_val*2):
                # reterive only the most recent ones - creates a sliding window effect
                LSTM_input = LSTM_input[2:]
                # send to LSTM model for prediction
                fatigue_result = predict_fatigue(LSTM_input, lag_val)
            # EYE CLOSURE PREDICTION
            # if enough values have been obtained for eye closure detection
            if len(LSTM_eye_input) == eye_lag_val:
                # send to model
                eye_close_result = predict_eye(LSTM_eye_input, eye_lag_val)
            # if YOLO model has supplied more than the number of previous values needed
            if len(LSTM_eye_input) > eye_lag_val:
                # use only recent one - creates sliding window
                LSTM_eye_input = LSTM_eye_input[1:]
                # send to LSTM model
                eye_close_result = predict_eye(LSTM_eye_input, eye_lag_val)
            # YAWN PREDICTION
            # if enough values have been obtained for yawn detection
            if len(LSTM_yawn_input) == yawn_lag_val:
                # send to model
                yawn_result = predict_yawn(LSTM_yawn_input, yawn_lag_val)
            # if YOLO model has supplied more than the number of previous values needed
            if len(LSTM_yawn_input) > yawn_lag_val:
                # use only recent one - creates sliding window
                LSTM_yawn_input = LSTM_yawn_input[1:]
                # send to LSTM model
                yawn_result = predict_yawn(LSTM_yawn_input, yawn_lag_val)
            # reset eye and mouth closure count for next window
            eye_closed_count = 0
            mouth_open_count = 0
        # if mouth_open_sec>3:
            # if the mouth has been open for longer than 2s a yawn is detected
            # text4="Yawn Detected"
        # else:
            # text4=None
        # display eye and mouth closure times and the LSTM model prediction
        # text1 = "Eye closure time: %.4f" % (eye_closed_sec)
        # text2="Mouth Open time: %.4f" % (mouth_open_sec)
        # text3="Fatigue Level: %s" % (fatigue_result)
        # text4 = "Total eye closed time till now: %.4f" % (sum(eyesClosedLst))
        # text5 = "Total mouth open time till now: %.4f" % (sum(mouthOpenLst))
        # cv2.putText(frame,text1, (0, 20), cv2.FONT_HERSHEY_SIMPLEX,0.65,[255,255,255], 1)
        # cv2.putText(frame,text2, (0, 50), cv2.FONT_HERSHEY_SIMPLEX,0.65,[255,255,255], 1)
        # cv2.putText(frame,text3, (W-250, 20), cv2.FONT_HERSHEY_SIMPLEX,0.65,[255,255,255], 1)
        # cv2.putText(frame, text4, (0, 80), cv2.FONT_HERSHEY_SIMPLEX,0.65,[255,255,255], 1)
        # cv2.putText(frame, text5, (0, 110), cv2.FONT_HERSHEY_SIMPLEX,0.65,[255,255,255], 1)
        # if text4 is not None:
            # if yawn detected display it
            # cv2.putText(frame,text4, (W-250, 60), cv2.FONT_HERSHEY_SIMPLEX,0.65,[255,255,255], 1)
        if eye_close_result is not None:
            cv2.putText(frame, eye_close_result, (W-250, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.65, [255, 255, 255], 1)
        if yawn_result is not None:
            cv2.putText(frame, yawn_result, (W-250, 80),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.65, [255, 255, 255], 1)
        # ensure at least one detection exists
        if len(idxs) > 0:
            # loop over the indexes we are keeping
            for i in idxs.flatten():
                # extract the bounding box coordinates
                (x, y) = (boxes[i][0], boxes[i][1])
                (w, h) = (boxes[i][2], boxes[i][3])
                # draw a bounding box rectangle and label on the image
                color = [int(c) for c in COLORS[classIDs[i]]]
                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 1)
                text = "{}: {:.4f}".format(labels[classIDs[i]], confidences[i])
                cv2.putText(frame, text, (x, y-5),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)

        # show the output frame
        # cv2.imshow("Frame", frame)
        # key = cv2.waitKey(1) & 0xFF
        # if the esc key was pressed, break from the loop
        # if key == 27:
            # break
        # if an output video file path has been supplied and the video
        if writer is None:
            # initialize our video writer
            fourcc = cv2.VideoWriter_fourcc(*"MJPG")
            writer = cv2.VideoWriter(
                "result.avi", fourcc, 24, (frame.shape[1], frame.shape[0]), True)
        # if the video writer is not None, write the frame to the output
        # video file
        if writer is not None:
            writer.write(frame)

        # update the FPS counter
        fps.update()
        # update time
        start_eye = time.time()
        start_mouth = time.time()
    # stop the timer and display FPS information
    fps.stop()

    perlos = calculatePERLOS(sum(eyesClosedLst), fps.elapsed())
    pom = calculatePOM(sum(mouthOpenLst), fps.elapsed())

    print("elasped time: {:.2f}".format(fps.elapsed()))
    print("approx. FPS: {:.2f}".format(fps.fps()))
    # print(f'PERLOS = {calculatePERLOS(sum(eyesClosedLst), fps.elapsed())}')
    # print(f'POM = {calculatePOM(sum(mouthOpenLst), fps.elapsed())}')

    return (perlos, pom)


# create argument parser
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--path", type=str,
                default="temp_video.avi",
                help="path video for testing")
args = vars(ap.parse_args())
# configure models
ln, net, labels = config_yolo()
LSTM_model, LSTM_eye, LSTM_yawn = config_LSTM()
# colours for displaying boudning boxes
COLORS = [[0, 0, 255], [0, 255, 0], [
    255, 0, 0], [25, 217, 67], [225, 225, 77]]

# variables to store height and width of frame
W = None
H = None

print("opening video stream...")
# open video
vs = cv2.VideoCapture(args["path"] if args["path"] else 0)
# for writing to output file
writer = None
# calculates frames per second
fps = FPS().start()

# variables to count eye and mouth close time
eye_closed_count = 0
mouth_open_count = 0

# counts frame
frame_count = 0

# create a timer value for eye and mouth closure times
start_eye = time.time()
start_mouth = time.time()
# variables that will store how long eyes are closed and mouth is open
eye_closed_sec = 0
mouth_open_sec = 0
# will store result of LSTM model
fatigue_result = None
yawn_result = None
eye_close_result = None
# create an empty list to store YOLO output that will be fed into LSTM
LSTM_input = []
LSTM_eye_input = []
LSTM_yawn_input = []


def videoAnalyzer():
    # run the YOLO model which will calls the LSTM model
    (perlos, pom) = run_yolo(200, 6, 10)
    return (perlos, pom)

def upload_video():
    video_file = request.files['video']
    video_path = 'PythonModel/temp_video.avi'  # Path to temporarily store the video

    # Save the video file
    video_file.save(video_path)


    temp = videoAnalyzer()
    print(f'perlos is{temp[0]}')
    print(f'pom is{temp[1]}')


    # Merge the video
    merged_video_filename = 'merged_video.avi'
    folder = 'PythonModel'
      # Filename for the merged video
    merged_video_path = os.path.join(os.path.dirname(
        video_path), folder,  merged_video_filename)  # Path to store the merged video

    # Set the duration of the video (in seconds)
    duration = 10.0  # Replace with the actual duration of the recorded video

    # Convert webm to avi using moviepy
    video_clip = VideoFileClip(video_path)
    # Resize the video to the specified duration
    video_clip_resized = resize(video_clip, duration=duration)

    # Set the codec and fps of the merged video
    video_clip_resized.write_videofile(
        merged_video_path, codec='mpeg4', fps=video_clip_resized.fps, audio=False)

    # Delete the temporary video file
    os.remove(video_path)

    return 'Video merged and saved successfully!'


if __name__ == '__main__':
    app.run()
