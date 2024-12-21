import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaPlus, FaMinus, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const MyCart = ({ navigateToOrder }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Apples",
      price: 150,
      quantity: 2,
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Apple",
      description: "Fresh organic apples directly from the farm.",
      selected: true,
    },
    {
      id: 2,
      name: "Bananas",
      price: 60,
      quantity: 1,
      image: "https://via.placeholder.com/150/FFFF00/000000?text=Banana",
      description: "Ripe bananas packed with nutrients.",
      selected: false,
    },
    {
      id: 3,
      name: "Oranges",
      price: 120,
      quantity: 3,
      image: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Orange",
      description: "Juicy oranges sourced locally.",
      selected: true,
    },
  ]);

  const handleSelectItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity + change, 1),
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBilling = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Please select at least one item for billing!");
      return;
    }
    navigateToOrder(selectedItems);
  };

  const calculateTotal = () =>
    cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9fafb",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center fw-bold mb-4">My Cart</h3>
      <div className="row gy-3">
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            className="col-6 col-md-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
              }}
            >
              <motion.img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{
                  height: "100px",
                  objectFit: "cover",
                }}
                whileHover={{ scale: 1.2 }}
              />
              <div className="card-body p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <motion.h6
                    className="fw-bold text-dark mb-1"
                    whileHover={{ scale: 1.05, color: "#007bff" }}
                  >
                    {item.name}
                  </motion.h6>
                  <motion.div
                    onClick={() => handleSelectItem(item.id)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: item.selected ? "#28a745" : "#ccc",
                      color: "#fff",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                </div>
                <p
                  className="small text-muted mb-1"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.description}
                </p>
                <p className="fw-bold text-primary mb-2">₹{item.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <motion.button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaMinus />
                  </motion.button>
                  <span className="fw-bold">{item.quantity}</span>
                  <motion.button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaPlus />
                  </motion.button>
                </div>
                <motion.button
                  className="btn btn-danger btn-sm mt-3 w-100"
                  onClick={() => handleDeleteItem(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrashAlt /> Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div
        className="p-3 shadow-sm bg-light rounded"
        style={{ position: "sticky", bottom: "0", zIndex: "1000" }}
      >
        <h5 className="fw-bold">
          Total: ₹{calculateTotal()} ({cartItems.filter((item) => item.selected).length}{" "}
          items)
        </h5>
        <motion.button
          className="btn btn-success w-100"
          onClick={handleBilling}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Billing
        </motion.button>
      </div>
    </div>
  );
};

export default MyCart;
