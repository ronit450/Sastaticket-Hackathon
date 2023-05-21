import React from "react";
import "./about.css";

import developer1 from "./developer3.jpeg";
import developer2 from "./developer3.jpeg";
import developer3 from "./developer3.jpeg";
import developer4 from "./developer3.jpeg";
import developer5 from "./developer3.jpeg";
import developer6 from "./developer3.jpeg";

const developers = [
  {
    name: "Developer 1",
    role: "Frontend Developer",
    image: developer1,
  },
  {
    name: "Developer 2",
    role: "Backend Developer",
    image: developer2,
  },
  {
    name: "Developer 3",
    role: "UI/UX Designer",
    image: developer3,
  },
  {
    name: "Developer 4",
    role: "Data Scientist",
    image: developer4,
  },
  {
    name: "Developer 5",
    role: "Sleep Specialist",
    image: developer5,
  },
  {
    name: "Developer 6",
    role: "Travel Enthusiast",
    image: developer6,
  },
];

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="title">Welcome to Jet Lag</h1>
        <div className="description">
          <p>
            Welcome to Jet Lag, the professional service website that is
            passionate about improving your travel experience and addressing the
            challenges of jet lag. We understand that jet lag can significantly
            impact your well-being and productivity, and our goal is to provide
            you with accurate fatigue calculations, personalized insights, and
            practical solutions to mitigate the effects of jet lag.
          </p>
          <p>
            At Jet Lag, we utilize state-of-the-art deep learning models, such as
            CNN (Convolutional Neural Networks), YOLO (You Only Look Once), and
            LSTM (Long Short-Term Memory), to calculate fatigue levels. By
            analyzing various factors, our advanced algorithms provide precise
            fatigue calculations that go beyond traditional methods.
          </p>
          <p>
            We recognize that jet lag is not limited to physical fatigue alone. It
            can also affect your focus, reaction time, and memory, crucial for a
            seamless travel experience. To assess these cognitive aspects, we
            have incorporated engaging games that evaluate your performance and
            provide valuable insights into your focus, reaction time, and memory
            lag. These interactive games, combined with your own subjective
            feelings and emotions, comprehensively assess your jet lag severity.
          </p>
          <p>
            Upon completing our assessment, we provide you with a detailed jet lag
            percentage and severity level. Our user-friendly interface displays
            personalized recommendations and strategies to mitigate jet lag based
            on the severity level indicated. Whether it's adjusting your sleep
            schedule, incorporating light exposure, or making dietary
            modifications, we offer tailored solutions to help you minimize jet
            lag and maximize your travel experience.
          </p>
          <p>
            We understand the importance of accurate and reliable information, and
            our commitment to excellence drives us to continuously improve our
            algorithms and methodologies. Our team of experts, including data
            scientists, sleep specialists, and travel enthusiasts, work tirelessly
            to ensure that our calculations are precise, up-to-date, and aligned
            with the latest research in the field of jet lag mitigation.
          </p>
          <p>
            At Jet Lag, your health and well-being are at the forefront of
            everything we do. We believe that by effectively managing jet lag, you
            can optimize your travel experience, improve productivity, and enjoy
            your journey to the fullest.
          </p>
          <p>
            Thank you for choosing Jet Lag. We look forward to being your trusted
            companion in combating jet lag and enhancing your travels.
          </p>
        </div>
      </div>
      <div className="developers">
        <h2 className="developers-title">Our Developers</h2>
        <div className="developer-grid">
          {developers.map((developer, index) => (
            <div key={index} className="developer-item">
              <img
                className="developer-image"
                src={developer.image}
                alt={developer.name}
              />
              <h3 className="developer-name">{developer.name}</h3>
              <p className="developer-role">{developer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
