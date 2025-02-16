import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaBox, FaFileDownload } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Dashboard1 = () => {
  const token = localStorage.getItem("TOKEN");
  const [orders, setOrders] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const navigate=useNavigate()


  const getOrderDetail=(id, innerID)=>{ 
    navigate(`/getOrderDetail/${id}/${innerID}`)


  }
 

  const downloadReceipt = (orderId) => {
    alert(`Receipt for Order ID: ${orderId} downloaded.`);
    // Implement the logic for downloading the receipt as a PDF.
  };

  useEffect(() => { 


    
    const getTotalOrder = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/admin/getTotalOrder", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        } else {
          const data = await response.json();
          setOrders(data.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    getTotalOrder(); 



   
  }, [token]);


  

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

          {/* User Management Section */}
          <motion.div className="col-12" whileHover={{ scale: 1.03 }}>
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold">
                User Management <FaUsers className="ms-2 text-info" />
              </h5>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((user, index) => (
                    <tr key={index}>
                      <td>{user.userName}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{user.orders.length}</td>
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
                  {orders.map((innerOrder) =>
                    innerOrder.orders.map((item, index) => (
                      <tr onClick={()=>{getOrderDetail(item._id, innerOrder._id)}}  key={index}>
                        <td>{item._id}</td>
                        <td>{new Date(item.placedAt).toLocaleDateString()}</td>
                        <td>{innerOrder.userName}</td>
                        <td>{innerOrder.address}</td>
                        <td>{item.progress[item.progress.length-1]?.status || "N/A"}</td>
                        <td>₹{item.total}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => downloadReceipt(item._id)}
                          >
                            <FaFileDownload className="me-1" /> Download Receipt
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>


               {/* Overall Summary Section */}
         
            

          </motion.div>
          <motion.div className="col-12" whileHover={{ scale: 1.03 }}>
  <div className="card shadow-sm p-4 text-center">
    <h5 className="fw-bold">Overall Summary</h5>
    <div className="row">
      <div className="col-6">
        <h6>Total Orders</h6>
        <p className="text-primary fs-4 fw-bold">
          {orders.reduce((totalCount, innerOrder) => totalCount + innerOrder.orders.length, 0)}
        </p>
      </div>
      <div className="col-6">
        <h6>Total Income</h6>
        <p className="text-success fs-4 fw-bold">
          ₹{orders.reduce((totalIncome, innerOrder) => 
            totalIncome + innerOrder.orders.reduce((orderTotal, item) => orderTotal + item.total, 0), 0)}
        </p>
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
