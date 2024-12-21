import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaCheckCircle, FaTimesCircle, FaShippingFast, FaCreditCard, FaHome, FaClock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const MyOrders = () => {
  const orders = [
    {
      orderId: "ORD12345678",
      user: { name: "John Doe", mobile: "+91 9876543210" },
      address: "123, Green Street, Mumbai, Maharashtra, 400001",
      orderDate: "20th Dec 2024",
      deliveryType: "Home Delivery",
      paymentType: "Credit Card",
      totalPrice: 1299,
      items: [
        { name: "Wireless Earbuds", quantity: 1, price: 999, image: "https://via.placeholder.com/150" },
        { name: "USB-C Cable", quantity: 2, price: 150, image: "https://via.placeholder.com/150" },
      ],
      progress: [
        { status: "Order Confirmed", date: "20th Dec 2024, 10:00 AM" },
        { status: "Shipped", date: "21st Dec 2024, 9:00 AM" },
        { status: "Out for Delivery", date: "22nd Dec 2024, 4:00 PM" },
        { status: "Delivered", date: "22nd Dec 2024, 7:30 PM" },
      ],
    },
    {
      orderId: "ORD87654321",
      user: { name: "Alice Brown", mobile: "+91 9123456789" },
      address: "45, Blue Avenue, Pune, Maharashtra, 411001",
      orderDate: "15th Dec 2024",
      deliveryType: "Store Pickup",
      paymentType: "UPI",
      totalPrice: 2499,
      items: [{ name: "Gaming Mouse", quantity: 1, price: 2499, image: "https://via.placeholder.com/150" }],
      progress: [
        { status: "Order Confirmed", date: "15th Dec 2024, 9:30 AM" },
        { status: "Ready for Pickup", date: "15th Dec 2024, 4:00 PM" },
      ],
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9fafb",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h3 className="text-center fw-bold mb-4">My Orders</h3>
        <div className="row gy-4">
          {orders.map((order, index) => (
            <motion.div
              key={index}
              className="col-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-1">
                    Order ID: <span className="text-muted">{order.orderId}</span>
                  </h6>
                  <span className="text-muted small">Order Date: {order.orderDate}</span>
                </div>
                <hr />
                <p className="small text-muted">
                  <strong>User:</strong> {order.user.name} | {order.user.mobile}
                </p>
                <p className="small text-muted">
                  <strong>Address:</strong> {order.address}
                </p>
                <p className="small text-muted">
                  <strong>Payment Type:</strong> {order.paymentType} <FaCreditCard className="ms-2 text-primary" />
                </p>
                <p className="small text-muted">
                  <strong>Delivery Type:</strong> {order.deliveryType}{" "}
                  {order.deliveryType === "Home Delivery" ? (
                    <FaHome className="ms-2 text-success" />
                  ) : (
                    <FaTruck className="ms-2 text-info" />
                  )}
                </p>
                <p className="small text-muted">
                  <strong>Total Price:</strong> ₹{order.totalPrice}
                </p>
                <div className="mt-3">
                  <h6 className="fw-bold">Items Ordered:</h6>
                  <div className="row gy-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="col-6 col-md-4">
                        <motion.div
                          className="d-flex align-items-center shadow-sm p-2 rounded"
                          style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "50px", height: "50px" }}
                            className="me-2"
                          />
                          <div>
                            <p className="mb-1 fw-bold small">{item.name}</p>
                            <p className="text-muted small">
                              Qty: {item.quantity} | ₹{item.price}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="fw-bold">Order Progress:</h6>
                  <div className="progress" style={{ height: "5px", borderRadius: "5px" }}>
                    <motion.div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(order.progress.length / 4) * 100}%`,
                        backgroundColor:
                          order.progress[order.progress.length - 1].status === "Delivered" ? "#28a745" : "#007bff",
                      }}
                    ></motion.div>
                  </div>
                  <ul className="list-group list-group-flush mt-3">
                    {order.progress.map((step, idx) => (
                      <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center small"
                      >
                        <span>{step.status}</span>
                        <span className="text-muted">{step.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
