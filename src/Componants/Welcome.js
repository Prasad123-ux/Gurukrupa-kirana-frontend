import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../Styles/welcome.css"

function WelcomePage() { 
 const [userInfo, setUserInfo] = useState({name:"", mobile_number:""}) 


 const onClick=(e)=>{ 
  setUserInfo({...userInfo,[e.target.name]:e.target.value})

 }
  return (
    <div
      className="container-fluid welcome vh-100 d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        background: ' linear-gradient(to bottom, #f7f9fc, #e9ecef)',
        backgroundSize: "cover",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Animation */}
      <motion.div
        className="position-absolute w-100 h-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: 'url("https://via.placeholder.com/1200x800?text=Grocery+Background")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></motion.div>

      {/* Animated Title */}
      <motion.h1
        className="display-3 fw-bold text-success"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Welcome to Gurukrupa Kirana
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="fs-5 text-dark"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.8" }}
      >
        Your trusted grocery delivery service. Fresh products delivered straight to your doorstep with love and care!
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* <button className="btn btn-success btn-lg px-5 mt-4 fw-bold shadow-lg " type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">  Let’s Start </button> */}
       <Link to="/home"> <button className="btn btn-success btn-lg px-5 mt-4 fw-bold shadow-lg " type="button"> Let's Start</button></Link>
      </motion.div>


      {/* Form Section  */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Basic info</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      <form class="row g-3 needs-validation" novalidate>
  <div class="col-md-12 position-relative">
    <label for="validationTooltip01" class="form-label">Your Name</label>
    <input type="text" class="form-control" id="validationTooltip01" placeholder="Prasad Metkar"  onChange={onClick} required/>
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>
  <div class="col-md-12 position-relative">
    <label for="validationTooltip02" class="form-label">Mobile Number</label>
    <input type="number" class="form-control" id="validationTooltip02" onChange={onClick} placeholder="9307173845" required />
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>
  </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <Link to="/home"><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button></Link>
      </div>
    </div>
  </div>
</div>
     



      {/* Image Section */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img
          src="https://t4.ftcdn.net/jpg/04/29/43/43/240_F_429434384_GapBcO5CrZsOzQSvWJC18Ke14WOFs95y.jpg"
          alt="Grocery Products"
          className="img-fluid rounded shadow-lg"
          style={{
            border: "8px solid rgba(0, 0, 0, 0.1)",
          }}
        />
      </motion.div>

      {/* Floating Elements for Style */}
      <motion.div
        className="position-absolute top-0 start-0"
        style={{
          width: "100px",
          height: "100px",
          background: "rgba(0, 255, 0, 0.3)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, -20, 20], y: [0, 20, -20] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
      <motion.div
        className="position-absolute bottom-0 end-0"
        style={{
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 0, 0.4)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -30, 30], y: [0, -30, 30] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
      
    </div>
  );
}

export default WelcomePage;
