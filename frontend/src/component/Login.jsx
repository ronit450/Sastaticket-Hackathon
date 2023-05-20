import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import the CSS file for styling
import "./navbar.css";

const Login = () => {
  return (
    <div className="terms-container">
      <div className="terms-text">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to our professional air ticket service website! We strive to
          provide you with excellent services and enhance your travel
          experience. Before using our website and its features, please
          carefully review the following terms and conditions that govern your
          use. By using our website, you agree to be bound by these terms and
          conditions. If you do not agree with any part of these terms and
          conditions, please refrain from using our website. General
        </p>
        Terms
        <p>
          1.1. User Agreement: By using our website, you agree to comply with
          these terms and conditions, as well as any applicable laws and
          regulations. ,
        </p>
        <p>
          1.2. Age Restriction: You must be at least 18 years old to use our
          website. If you are under 18, you must use our website under the
          supervision of a parent or legal guardian.
        </p>
        <p>
          1.3. Modification of Terms: We reserve the right to modify or update
          these terms and conditions at any time without prior notice. Your
          continued use of our website after any modifications constitutes your
          acceptance of the revised terms and conditions. Privacy and Data
          Collection.
        </p>
        <p>
          2.1. Video Recording: As part of our jet lag calculation feature, we
          may record videos during your session to analyze your behavior and
          gather data to calculate jet lag accurately. By using our website, you
          consent to the video recording and data collection process.
        </p>
        <p>
          2.2. Data Usage: The videos and data collected during your session may
          be used for research and development purposes, as well as to improve
          our services. We may also anonymize and aggregate the data for
          analytical purposes or share it with third parties. Your personal
          information will be handled in accordance with our Privacy Policy.
        </p>
        <h4>
          I Agree to the <span>Terms of Services</span> and I read the Privacy
        </h4>
      </div>

      <Link to="/recording" className="accept-link">
        Accept
      </Link>
    </div>
  );
};

export default Login;
