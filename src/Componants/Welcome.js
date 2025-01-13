import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../Styles/welcome.css" 
import { useNavigate } from "react-router-dom"; 
// import { useToast } from "@chakra-ui/react"; 

function WelcomePage() {  
  const [userInfo, setUserInfo] = useState({name:"", mobile_number:""})  
  const [loading,setLoading]= useState(true)

  const [tokenData,setTokenData]= useState(null)  
  const navigate=useNavigate()
  // const toast= useToast();


  
  const notifySuccess = () => toast.success('This is a success message!');
  const notifyError = (message) => toast.error(message);
  const notifyInfo = () => toast.info('This is an info message!');
  const notifyWarning = () => toast.warning('This is a warning message!');
 


  useEffect(()=>{
    const token = localStorage.getItem("TOKEN");
    setTokenData(token);
  },[])


 const onChange=(e)=>{ 
  console.log(e.target)
  // setUserInfo({...userInfo,[e.target.name]:e.target.value})
  setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

 }  



 const handleFormSubmit=async(e)=>{  
  e.preventDefault()
  console.log(userInfo)
  try{ 
  const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/register", {
    method:"POST",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify({userInfo:userInfo})
  })
  if(!response.ok){
    const errorText = await response.text();
    // notifyError("failed to proceed, Please try again")
    throw new Error(`Request failed with status ${response.status}: ${errorText}`);
  }
  
  const data = await response.json() 
  localStorage.setItem("TOKEN", data.token)  
  
  navigate("/home")
  notifySuccess(data.message)

  }catch(err){       
     notifyError(err.message)
  }
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
        }}> 


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
      { !tokenData || tokenData==="undefined"? (<button className="btn btn-success btn-lg px-5 mt-4 fw-bold shadow-lg " type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">  Let’s Start </button>)
       : (<Link to="/home"> <button className="btn btn-success btn-lg px-5 mt-4 fw-bold shadow-lg " type="button"> Let's Start</button></Link>)}
      </motion.div>


      {/* Form Section  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Basic info</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <form className="row g-3 needs-validation"  onSubmit={handleFormSubmit}  noValidate>
  <div className="col-md-12 position-relative">
    <label htmlFor="validationTooltip01" className="form-label">Your Name</label>
    <input type="text" className="form-control" id="validationTooltip01" value={userInfo.name} name="name" placeholder="Prasad Metkar"   onChange={onChange} required/>
    <div className="valid-tooltip">
      Looks good!
    </div>
  </div>
  <div className="col-md-12 position-relative">
    <label htmlFor="validationTooltip02" className="form-label">Mobile Number</label>
    <input type="Number" className="form-control"  id="validationTooltip02" value={userInfo.mobile_number} name="mobile_number"  placeholder="Enter your mobile number"  onChange={onChange} required />
    <div className="valid-tooltip">
      Looks good!
    </div>
  </div>
 

    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>      </div>
      </form>
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
      <ToastContainer autoClose={7000}/>
      
    </div>
      
  
  );
}

export default WelcomePage;
