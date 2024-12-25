import React from "react";
import { motion } from "framer-motion";
import "../Styles/AboutSection.css";

const AboutSection = () => {
  const shopImages = [
    "/images/shop1.jpg",
    "/images/shop2.jpg",
    "/images/shop3.jpg",
    "/images/shop4.jpg",
  ];

  return (
    <div className="about-section">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>About Us</h2>
        <p>Discover more about Gurukrupa Kirana Store</p>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3>Our Story</h3>
          <p>
            Gurukrupa Kirana Store was established in [Year] with a mission to
            provide top-quality grocery products to our valued customers. Over
            the years, we have built a strong reputation for offering fresh,
            affordable, and diverse goods to meet our community's needs.
          </p>
          <h3>Our Commitment</h3>
          <p>
            We prioritize customer satisfaction above all else. Our team
            ensures smooth operations, timely delivery, and a personalized
            shopping experience. We manage inventory with precision, supply
            goods efficiently, and strive to maintain a welcoming environment
            for everyone.
          </p>
          <h3>Why Choose Us?</h3>
          <ul>
            <li>High-quality products at competitive prices</li>
            <li>Customer-centric service</li>
            <li>Flexible delivery options</li>
            <li>Transparent business practices</li>
          </ul>
        </motion.div>

        <motion.div
          className="about-images"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3>Our Shop in Action</h3>
          <div className="image-gallery">
            {shopImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Shop ${index + 1}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="about-extra"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>How We Operate</h3>
        <p>
          At Gurukrupa Kirana Store, we maintain a seamless workflow by using
          state-of-the-art inventory management systems. Our team ensures that
          all orders are processed promptly, from packing to delivery. With a
          robust logistics network, we guarantee timely and accurate
          distribution of goods.
        </p>
        <p>
          We value the trust of our customers and are committed to providing
          them with a hassle-free shopping experience. Our shop is your one-stop
          destination for all your grocery needs.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutSection;
