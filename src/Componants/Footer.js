import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';  




function Footer() {
  const navigate= useNavigate()
  const [token , setToken]= useState()
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(()=>{
  console.log(token)
const tokenValue=localStorage.getItem("TOKEN") 
console.log(tokenValue)
setToken(tokenValue)
  }, [token])


        const notifySuccess = (message) => toast.success(message);
        const notifyError = (message) => toast.error(message);
        const notifyInfo = (message) => toast.info(message);
        const notifyWarning = (message) => toast.warning(message);
    
  

  const categories = ["बिस्किटे", "साबण", "शॅम्पू", "धुण्याचा पावडर", "टूथपेस्ट", "चहा पावडर", ];


  const linkHover = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300 },
  };


  const handleCategoryData=(category)=>{  
    if (!token){
      window.scrollTo(0,0)
      notifyWarning("Please Login Yourself")
      return 
      
    }else{
      navigate(`/categoryData/${category}`)
      window.scrollTo(0,0)

     
    }
   

  }

  const handleHome=()=>{
    navigate("/")
    
  }
  return (
    <motion.footer
      className="text-light pt-5"
      style={{
        backgroundColor: "#0d0d0d",
        fontFamily: "'Poppins', sans-serif",
      }}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2, duration: 1 }}
    >
      <div className="container">
        <ToastContainer/>
        <div className="row">
          {/* Logo and Social Media Section */}
          <div className="col-md-4 mb-4 text-center">
            <motion.div variants={sectionVariants}>
              <img
                src="https://res.cloudinary.com/det3aoore/image/upload/v1736835677/product_images/cr6oqb4rn7m2dmbxlvtn.png"
                alt="Logo"
                className="img-fluid mb-3"
                style={{ width: "120px", borderRadius: "50%" }} 
                onClick={handleHome}
              />
              <h5 className="fw-bold text-uppercase" style={{ fontSize: "14px" }}>
              गुरुकृपा किराणा
                 


              </h5>
              <div className="mt-3">
                <motion.a
                  href="https://www.facebook.com/prasad.metkar.925"
                  whileHover={linkHover}
                  className="text-light mx-2"
                >
                  <FaFacebook size={25} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={linkHover}
                  className="text-light mx-2"
                >
                  <FaInstagram size={25} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/metkar.prasad/"
                  whileHover={linkHover}
                  className="text-light mx-2"
                >
                  <FaTwitter size={25} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={linkHover}
                  className="text-light mx-2"
                >
                  <FaYoutube size={25} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/prasad-metkar/"
                  whileHover={linkHover}
                  className="text-light mx-2"
                >
                  <FaLinkedin size={25} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Categories Section */}
          <div className="col-md-4 mb-4">
            <motion.div variants={sectionVariants}>
              <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "14px" }}>
              लोकप्रिय श्रेणी
              </h5>
              <ul className="list-unstyled text-muted">
                {categories.map((item, index)=>{
                  return  <li key={index} className="mb-2">
                  <motion.a 
                    
                    className="text-decoration-none text-light"
                    whileHover={linkHover}
                    onClick={()=>{handleCategoryData(item)}}
                    style={{cursor:"pointer"}}
                  >
                  {item}
                  </motion.a>
                </li>
})}
 </ul>

            </motion.div>
          </div>

          {/* About Section */}
          <div className="col-md-4 mb-4">
            <motion.div variants={sectionVariants}>
              <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "14px" }}>
              आमच्याबद्दल
              </h5>
              <p className=" small">
              गुरुकृपा किराणा हा तुमचा ताजा आणि उच्च दर्जाच्या किराणासाठी विश्वासू भागीदार आहे. आम्ही तुम्हाला घरपोच सेवा आणि आश्चर्यकारक सवलतींसह सहज खरेदीचा अनुभव देतो. 😊🛒🚚








              </p>
              <img
                src="https://res.cloudinary.com/det3aoore/image/upload/v1736835256/product_images/all-fmcg-grocery-products_dlvtnn.jpg"
                alt="Category"
                className="img-fluid mt-3"
                style={{ borderRadius: "10px", width: "100px",height:"100px" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Footer Links */}
        <hr className="text-muted" />
        <motion.div
          className="d-flex justify-content-between small text-muted"
          variants={sectionVariants}
        >
          <p>© {new Date().getFullYear()} Gurukrupa Grocery. All Rights Reserved.</p>
          <p>
            <a href="/about" className="text-light text-decoration-none">
            सेवेच्या अटी
            </a>{" "}
            |{" "}
            <a href="/about" className="text-light text-decoration-none">
            गोपनीयता धोरण
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
