  import React from "react";
  import { Link } from "react-router-dom";
  import "../CSS/Footer.css"

  const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section about">
            <h2 className="footer-section-about-h2">Contact</h2>
            <p className="footer-section-about-p">
              2nd floor, opposite WaterTank, WorkShop Corner, 
               Nanded, Maharashtra 431605 INDIA 
               +91 8625817334, +91 9890796149 
               sales@tekisky.com
            </p>
          </div>

          <div className="footer-section links">
            <h2 className="footer-section-about-h2">Our Commitment</h2>
            <ul className="footer-section-about-ul">
              <li>Corporate Training</li>
              <li>Corporate Trainers</li>
              <li>IT Consultancy</li>
              <li>Software Development</li>
            </ul>
          </div>

          <div className="footer-section social">
            <h2 className="footer-section-about-h2">Follow Us</h2>
            <div className="social-icons">
              <p><i className="fab fa-facebook-f"></i> Facebook</p><br />
              <p><i className="fab fa-instagram"></i> Instagram</p><br />
              <p><i className="fab fa-twitter"></i> Twitter</p><br />
              <p><i className="fab fa-youtube"></i> YouTube</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-a">
            &copy; Tekisky Pvt Ltd all rights reserved..
          </p>
        </div>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </footer>
    );
  };

  export default Footer;
