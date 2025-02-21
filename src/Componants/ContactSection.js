import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../Styles/ContactSection.css";

const ContactSection = () => {
  const whatsappGroupLink = "https://chat.whatsapp.com/your-group-link";

  return (
    <div className="contact-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          संपर्क करा
        </motion.h2>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-card">
            <FaPhoneAlt className="icon phone-icon" />
            <p>
              <strong>Mobile:</strong> <a href="tel:+918530855101">+91 8530825101</a>
            </p>
          </div>

          <div className="contact-card">
            <FaEnvelope className="icon email-icon" />
            <p>
              <strong>Email:</strong> <a href="mailto:prasadmetkar333@gmail.com">gurukrupakirana333@gmail.com</a>
            </p>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt className="icon address-icon" />
            <p>
              <strong>पत्ता:</strong> गुरुकृपा किराणा स्टोअर, बसस्थानकाजवळ, सावरगाव, महाराष्ट्र
            </p>
          </div>
        </motion.div>

        <motion.div
          className="social-media"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://wa.me/918530825101" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon whatsapp-icon" />
            </a>
            <a href="https://www.facebook.com/prasad.metkar.925" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon facebook-icon" />
            </a>
            <a href="https://www.instagram.com/metkar.prasad/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon instagram-icon" />
            </a>
          </div>
          <motion.a
            href={whatsappGroupLink}
            target="_blank"
            rel="https://chat.whatsapp.com/D7szB6CX7uu9m1iCHSG5tJ"
            className="btn btn-success whatsapp-group-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
           व्हॉट्सअॅप गटात सामील व्हा
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
