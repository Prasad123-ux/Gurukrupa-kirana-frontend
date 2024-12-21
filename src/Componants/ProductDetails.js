import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Dummy Data
const product = {
  id: 1,
  name: "Fresh Apples",
  price: 5.99,
  category: "Fruits",
  description: "Fresh and juicy apples directly from the farm. Packed with vitamins and nutrients.",
  image: "https://via.placeholder.com/200/FF0000/FFFFFF?text=Apple",
  offers: [
    { quantity: 5, discount: "10%" },
    { quantity: 10, discount: "20%" },
  ],
};

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  const calculatePrice = () => {
    let finalPrice = product.price * quantity;
    const offer = product.offers.find((o) => quantity >= o.quantity);
    if (offer) {
      finalPrice -= (finalPrice * parseInt(offer.discount)) / 100;
    }
    return finalPrice.toFixed(2);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      {/* Product Section */}
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="row align-items-center">
          <motion.div
            className="col-md-6 text-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </motion.div>
          <motion.div
            className="col-md-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h3 className="fw-bold">{product.name}</h3>
            <p className="text-muted mb-1">Category: {product.category}</p>
            <p className="text-muted">{product.description}</p>
            <p className="text-success fw-bold">Price: ${product.price.toFixed(2)} per unit</p>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center my-3">
              <label htmlFor="quantity" className="me-2 fw-bold">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="form-control"
                style={{ width: "80px" }}
              />
            </div>

            {/* Total Price */}
            <p className="text-primary fw-bold">Total: ${calculatePrice()}</p>

            {/* Order Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary px-4 py-2"
              style={{ borderRadius: "20px" }}
            >
              Make Order
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Offers Section */}
      <motion.div
        className="container mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="fw-bold text-center mb-4">Available Offers</h4>
        <div className="row">
          {product.offers.map((offer, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-6 mb-3"
              whileHover={{ scale: 1.05 }}
              style={{
                borderRadius: "12px",
                backgroundColor: "#fff",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h6 className="fw-bold">
                Buy {offer.quantity} or more:
                <span className="text-success ms-2">{offer.discount} Off</span>
              </h6>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="container mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="fw-bold text-center mb-4">About Our Store</h4>
        <p className="text-muted text-center">
          Welcome to our grocery store! We provide the freshest produce and high-quality items for your everyday needs.
          Our mission is to deliver excellence and ensure every customer is satisfied. Thank you for choosing us!
        </p>
      </motion.div>
    </div>
  );
}

export default ProductDetails;
