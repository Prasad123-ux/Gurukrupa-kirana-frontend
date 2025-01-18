import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaCreditCard } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// import { array } from "../../../Backend/src/Controllers/AddImages"; 
import { ToastContainer, toast } from 'react-toastify'; 
import Loader from "./Loader";  
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MyOrders = () => {
  const [info, setInfo] = useState([]);
  const token = localStorage.getItem("TOKEN");  
  const [loading, setLoading]= useState(true) 
  const [error, setError]= useState()
  const navigate= useNavigate()

       
        const notifyWarning = (message) => toast.warning(message);





  useEffect(() => {
    window.scrollTo(0,0)
    const getMyOrder = async () => {
      try {
        const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/getMyOrders", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          // notifyError("Internal Server Error") 
          setError(errorText)
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        } else {
          const data = await response.json();
          
          setInfo(data.data); // Assuming data.data is the order object
        }
      } catch (err) {
        notifyWarning(err.message);
        // notifyError(err.message) 
        // setError("Internal server Error")
        
      }finally{
        setLoading(false)
      }
    };
  
    getMyOrder();
  }, [token]);

 
  
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f9fafb", padding: "20px", minHeight: "100vh", paddingTop: "100px" }}> 
    <ToastContainer/>



      <div className="container">
        <h3 className="text-center fw-bold mb-4">My Orders</h3>
        <div className="row gy-4">  
           {loading ? (
                    <div className="text-center"><Loader/></div>
                  ) : error ?  (
                     <div className="text-danger text-center">{error}</div>
                  ): info.orders ?  
           info.orders.map((item , index)=>{
              return ( 
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                  <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-1">Order ID: <span className="text-muted">{item._id}</span></h6>
                      <span className="text-muted small">Order Date: {new Date(item.placedAt).toLocaleDateString()}</span>
                    </div>
                    <hr />
                    <p className="small text-muted"><strong>User:</strong> {info.userName} | {info.mobileNumber}</p>
                    <p className="small text-muted"><strong>Address:</strong> {info.address}</p>
                    <p className="small text-muted"><strong>Payment Type:</strong> {item.paymentMethod==="cod"?"Cash on delivery":"Home Delivery"} <FaCreditCard className="ms-2 text-primary" /></p>
                    <p className="small text-muted"><strong>Delivery Type:</strong> {item.deliveryOption==="store" ? "Pick up from Store":"Delivered by Home"} <FaTruck className="ms-2 text-info" /></p>
                    <p className="small text-muted"><strong>Total Price:</strong> ₹{item.total}</p>
                    <div className="mt-3">
                      <h6 className="fw-bold">Items Ordered:</h6>
                      <div className="row gy-2">
                        {item.items?.map((orderedItem, idx) => (
                          <div key={idx} className="col-6 col-md-4">
                            <motion.div
                              className="d-flex align-items-center shadow-sm p-2 rounded"
                              style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <img src={orderedItem.image[0]} alt={orderedItem.itemName} style={{ width: "50px", height: "50px" }} className="me-2" />
                              <div className="">
                                <p className="mb-1 fw-bold small">{orderedItem.itemName} </p>
                                <p className="text-muted small">Qty: {orderedItem.quantity} {orderedItem.unit}  </p>
                                <p className="mb-1 fw-bold small"> Price: ₹ {orderedItem.price}/ {orderedItem.unit} </p>

                                {/* <div className="mb-1 fw-bold small">₹ {orderedItem.price}/ {orderedItem.unit}</div> */}
                              </div>
                            </motion.div>
                          </div>
                        ))}
                        
                      </div>
                    </div>
                  </div>

                 


                  <div className="mt-4">
  <h6 className="fw-bold">Order Progress:</h6>
  <div className="progress" style={{ height: "5px", borderRadius: "5px" }}>
    <motion.div
      className="progress-bar"
      role="progressbar"
      style={{
        width: `${
          item?.progress && item.progress.length > 0
            ? (item.progress.length / 4) * 100
            : 0
        }%`,
        backgroundColor:
          item?.progress &&
          item.progress.length > 0 &&
          item.progress[item.progress.length - 1]?.status === "Delivered"
            ? "#28a745"
            : "#007bff",
      }}
    ></motion.div>
  </div>
  <ul className="list-group list-group-flush mt-3">
    {item?.progress && item.progress.length > 0 ? (
      item.progress.map((step, idx) => (
        <li
          key={idx}
          className="list-group-item d-flex justify-content-between align-items-center small"
        >
          <span>{step.status || "Status not available"}</span>
          <span className="text-muted">
            {step.date ? new Date(step.date).toLocaleDateString():"" || "Date not available"}
          </span>
          <span className="text-muted">
            {step.timing  || "Time not available"}
          </span>
        </li>
      ))
    ) : (
      <li className="list-group-item small text-muted">
        No progress information available
      </li>
    )}
  </ul>
</div>











                </motion.div>
              )

           }):<div className="text-center"> 
           <h6 className="text-center fw-bold mb-4">Your My Order Section is empty! 🛒, Please Place Order...!</h6>
        
           <Link to="/home" className="text-center">Explore Products</Link>
          
          </div>}
            </div> 
      

      </div>
    
    </div>
  );
}  

export default MyOrders;