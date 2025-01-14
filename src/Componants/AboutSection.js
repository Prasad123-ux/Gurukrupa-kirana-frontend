import React from "react";
import { motion } from "framer-motion";
import "../Styles/AboutSection.css";

const AboutSection = () => {
  const shopImages = [
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834654/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC40Ml80MWEzOGJkY19jY2l3bjY=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834637/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC40M184NzZmZDg0Nl9rbzdlM2Y=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834614/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC40MV9iODUwZGFjZl9xZHBkcmU=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834600/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC40MF8zMDA1YjU4Ml9pdG83a2Y=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834582/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC4zOF9kY2YzMDdjOV9wZHRjY2w=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834547/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC4zN184YmEzNzI4OV9ncGNycGo=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834532/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC4zNl82ZDBkZDQ2OF9hdmZxMHU=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834514/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC4zNl8zYjQ0MGNjNV94eXE5cjA=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834503/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC4zNV81ZWZjZDEyN191YzhzM2g=/preview",
    "https://res-console.cloudinary.com/det3aoore/thumbnails/v1/image/upload/v1736834483/cHJvZHVjdF9pbWFnZXMvV2hhdHNBcHBfSW1hZ2VfMjAyNS0wMS0xNF9hdF8xMS4yOC4zNV8zMzk5ZmNjZl9pajVzc2k=/preview"


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
