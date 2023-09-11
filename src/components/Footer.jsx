import React from "react";
import "./Footer.css";
import FDLogo from "../images/FDLogo.png";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <img
          src={FDLogo}
          alt="logo"
          className="footer-logo"
          style={{ height: "50px" }}
        />
        <p>© {new Date().getFullYear()} RENEW FITNESS. All rights reserved.</p>
      </div>
      <div className="footer-mid">
        <div
          className="social-logos"
          style={{
            display: "flex",
            width: "100px",
            justifyContent: "space-between",
          }}
        >
          <a
            href="https://www.facebook.com/YourPage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook style={{ color: "#000" }} size={30} />
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="https://www.instagram.com/YourPage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram style={{ color: "#000" }} size={30} />
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </div>
      <div className="footer-right">
        <button className="footer-button">Contact Us</button>
      </div>
    </div>
  );
};

export default Footer;
