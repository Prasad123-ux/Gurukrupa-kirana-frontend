import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaBox, FaFileDownload } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard1 = () => {
  const orders = [
    {
      orderId: "ORD001",
      date: "20th Dec 2024",
      customer: "John Doe",
      address: "123, Green Street, Mumbai",
      status: "Delivered",
      total: 1299,
    },
    {
      orderId: "ORD002",
      date: "21st Dec 2024",
      customer: "Alice Brown",
      address: "45, Blue Avenue, Pune",
      status: "Pending",
      total: 2499,
    },
  ];

  const incomeData = [
    { month: "Jan", income: 10000 },
    { month: "Feb", income: 15000 },
    { month: "Mar", income: 20000 },
    { month: "Apr", income: 18000 },
  ];

  const salesData = [
    { product: "Vegetables", sales: 4000 ,date:"12 dec 2024"},
    { product: "Fruits", sales: 3000 },
    { product: "Dairy", sales: 5000 },
    { product: "Vegetables", sales: 4000 },

    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },
    { product: "Vegetables", sales: 4000 },

  ];
  const userData = [
    { name: "John Doe", email: "john@example.com", phone: "+91 9876543210", orders: 10 },
    { name: "Alice Brown", email: "alice@example.com", phone: "+91 9123456789", orders: 5 },
  ];

  const totalOrders = orders.length;
  const totalIncome = orders.reduce((acc, order) => acc + order.total, 0);

  const downloadReceipt = (orderId) => {
    alert(`Receipt for Order ID: ${orderId} downloaded.`);
    // Implement the logic for downloading the receipt as a PDF.
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div className="container py-4">
        <h3 className="text-center fw-bold mb-4">Shopkeeper Dashboard</h3>
        <div className="row gy-4">
          {/* Income Section */}
          <motion.div className="col-12 col-lg-6" whileHover={{ scale: 1.03 }}>
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold">
                Income Overview <FaChartLine className="ms-2 text-success" />
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={incomeData}>
                  <Line type="monotone" dataKey="income" stroke="#28a745" strokeWidth={2} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sales Section */}
          <motion.div className="col-12 col-lg-6" whileHover={{ scale: 1.03 }}>
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold">
                Sales Growth <FaBox className="ms-2 text-primary" />
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <Bar dataKey="sales" fill="#007bff" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div> 

          <motion.div className="col-12" whileHover={{ scale: 1.03 }}>
                      <div className="card shadow-sm p-4">
                        <h5 className="fw-bold">
                          User Management <FaUsers className="ms-2 text-info" />
                        </h5>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Orders</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userData.map((user, index) => (
                              <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.orders}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>

          {/* Orders Section */}
          <motion.div className="col-12" whileHover={{ scale: 1.03 }}>
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold">
                Orders <FaFileDownload className="ms-2 text-danger" />
              </h5>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.date}</td>
                      <td>{order.customer}</td>
                      <td>{order.address}</td>
                      <td>{order.status}</td>
                      <td>₹{order.total}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => downloadReceipt(order.orderId)}
                        >
                          <FaFileDownload className="me-1" /> Download Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Overall Summary Section */}
          <motion.div className="col-12" whileHover={{ scale: 1.03 }}>
            <div className="card shadow-sm p-4 text-center">
              <h5 className="fw-bold">Overall Summary</h5>
              <div className="row">
                <div className="col-6">
                  <h6>Total Orders</h6>
                  <p className="text-primary fs-4 fw-bold">{totalOrders}</p>
                </div>
                <div className="col-6">
                  <h6>Total Income</h6>
                  <p className="text-success fs-4 fw-bold">₹{totalIncome}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
