import React from "react";
import { motion } from "framer-motion";
import "../Styles/AboutSection.css";

const AboutSection = () => {
  const shopImages = [
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736171107/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNl9hdF8xOC41Ni41N18zNWI1OTBjY194amV0ZW4=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736170682/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNl9hdF8xOC41Ni41OF9jM2M4NTI1MV92a2MzYnA=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736170755/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNV9hdF8yMi4yNi4yOV8yOGQ3MGVjY19lNGlpZGw=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736171246/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNV9hdF8yMi4yNi4yOF8xMDAyNzI5Nl9xbWpzM28=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736170827/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNV9hdF8yMi4yNi4yM18xNTYxZTg0Zl9pZWFsZ2M=/preview",
     "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736170939/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNV9hdF8yMi4yNi4yNF9hYWJmMDAxN19ucHBxYWk=/preview",
     "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736170827/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNV9hdF8yMi4yNi4yM18xNTYxZTg0Zl9pZWFsZ2M=/preview",
     "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736170911/V2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0wNV9hdF8yMi4yNi4yMl82MWYwYTY3Ml9rZmltY3k=/preview",
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
            Gurukrupa Kirana Store was established in 2022 with a mission to
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
