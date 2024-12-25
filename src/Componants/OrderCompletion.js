import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { FaCreditCard, FaMoneyBillAlt, FaWallet, FaMobileAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderCompletion = () => {
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Mock user and cart data
  const user = {
    name: "John Doe",
    mobile: "9876543210",
  };

  const cartItems = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 150,
      quantity: 2,
      image: "https://via.placeholder.com/200/FF0000/FFFFFF?text=Apple",
      description: "Fresh organic apples directly from the farm.",
    },
    {
      id: 2,
      name: "Bananas",
      price: 60,
      quantity: 1,
      image: "https://via.placeholder.com/200/FFFF00/000000?text=Banana",
      description: "Ripe bananas packed with nutrients.",
    },
    {
      id: 3,
      name: "Oranges",
      price: 120,
      quantity: 3,
      image: "https://via.placeholder.com/200/FFA500/FFFFFF?text=Orange",
      description: "Juicy oranges sourced locally.",
    },
  ];

  const calculateTotal = () => {
    let total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (deliveryOption === "home" && total >= 500) {
      total += Math.ceil(total / 1000) * 20; // ₹20 for every ₹1000
    }
    return total.toFixed(2);
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.text("Order Receipt", 10, 10);
    doc.text(`User Name: ${user.name}`, 10, 20);
    doc.text(`Mobile: ${user.mobile}`, 10, 30);
    doc.text("Cart Items:", 10, 40);
    cartItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} x${item.quantity} - ₹${item.price}`, 10, 50 + index * 10);
    });
    doc.text(`Total Price: ₹${calculateTotal()}`, 10, 60 + cartItems.length * 10);
    doc.text("Thank you for shopping with us!", 10, 80 + cartItems.length * 10);
    doc.text("Gurukrupa kirana will be with you always ");
    doc.save("receipt.pdf");
  };

  const handleOrderPlacement = () => {
    if (!address || !paymentMethod || !deliveryOption) {
      alert("Please fill all the fields.");
      return;
    }
    setOrderPlaced(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f3f4f6",
        padding: "20px",
        minHeight: "100vh",
        paddingTop:"100px"
      }}
    >
      {!orderPlaced ? (
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Cart Items Section */}
          <div className="row mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="col-md-4 mb-3 bg-light p-3 shadow-sm rounded"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                  <h5 className="fw-bold mt-3">{item.name}</h5>
                  <p>{item.description}</p>
                  <p className="text-primary fw-bold">
                    Price: ₹{item.price} x {item.quantity}
                  </p>
                  <p className="text-success fw-bold">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Address Section */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            <h5 className="fw-bold">User Details</h5>
            <p>
              <strong>Name:</strong> {user.name} <br />
              <strong>Mobile:</strong> {user.mobile}
            </p>
            <h5 className="fw-bold">Enter Address</h5>
            <textarea
              className="form-control"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Delivery Options */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            <h5 className="fw-bold">Delivery Option</h5>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="homeDelivery"
                value="home"
                checked={deliveryOption === "home"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label className="form-check-label" htmlFor="homeDelivery">
                Home Delivery (₹20 per 1000 for orders above ₹500)
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="storePickup"
                value="store"
                checked={deliveryOption === "store"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label className="form-check-label" htmlFor="storePickup">
                Store Pickup (Free)
              </label>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            <h5 className="fw-bold">Choose Payment Method</h5>
            <div className="d-flex justify-content-around">
              <button
                className={`btn ${
                  paymentMethod === "creditCard" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setPaymentMethod("creditCard")}
              >
                <FaCreditCard size={24} /> Credit Card
              </button>
              <button
                className={`btn ${
                  paymentMethod === "upi" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <FaMobileAlt size={24} /> UPI
              </button>
              <button
                className={`btn ${
                  paymentMethod === "wallet" ? "btn-warning" : "btn-outline-warning"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <FaWallet size={24} /> Wallet
              </button>
              <button
                className={`btn ${
                  paymentMethod === "cod" ? "btn-secondary" : "btn-outline-secondary"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <FaMoneyBillAlt size={24} /> Cash on Delivery
              </button>
            </div>
          </div>

          {/* Place Order Button */}
          <motion.button
            className="btn btn-success w-100"
            onClick={handleOrderPlacement}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Place Order
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="container text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="fw-bold text-success">Order Placed Successfully!</h3>
          <p>Your order will be delivered soon. Thank you for shopping with us!</p>
          <button className="btn btn-primary" onClick={generateReceipt}>
            Download Receipt
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default OrderCompletion;
