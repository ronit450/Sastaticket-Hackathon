from flask import Flask, request
import os
from moviepy.editor import VideoFileClip
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/upload', methods=['POST'])
def upload_video():
    video_file = request.files['video']
    video_path = 'temp_video.webm'  # Path to temporarily store the video

    # Save the video file
    video_file.save(video_path)

    # Merge the video
    merged_video_path = 'merged_video.avi'  # Path to store the merged video

    # Convert webm to avi using moviepy
    # Create VideoFileClip object from the video file
    video_clip = VideoFileClip(video_path)

    # Set the codec and fps of the merged video
    video_clip.write_videofile(
        merged_video_path, codec='mpeg4', fps=video_clip.fps, audio=False)

    # Delete the temporary video file
    os.remove(video_path)

    return 'Video merged and saved successfully!'


if __name__ == '__main__':
    app.run()
