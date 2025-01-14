import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Footer() {
  const navigate= useNavigate()
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };


  const categories = ["Biscuits", "Soaps", "Shampoo", "Washing Powder", "ToothPaste", "Tea Powder", ];


  const linkHover = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300 },
  };


  const handleCategoryData=(category)=>{ 
    navigate(`/categoryData/${category}`)
    window.scrollTo(0,0)

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
        <div className="row">
          {/* Logo and Social Media Section */}
          <div className="col-md-4 mb-4 text-center">
            <motion.div variants={sectionVariants}>
              <img
                src="https://res.cloudinary.com/det3aoore/image/upload/v1736835677/product_images/cr6oqb4rn7m2dmbxlvtn.png"
                alt="Logo"
                className="img-fluid mb-3"
                style={{ width: "120px", borderRadius: "50%" }}
              />
              <h5 className="fw-bold text-uppercase" style={{ fontSize: "14px" }}>
                Gurukrupa Grocery
              </h5>
              <div className="mt-3">
                <motion.a
                  href="#"
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
                  href="#"
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
                  href="#"
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
                Popular Categories
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
                About Us
              </h5>
              <p className="text-muted small">
                Gurukrupa Grocery is your trusted partner for fresh and quality groceries. We offer a seamless shopping experience with doorstep delivery and amazing discounts.
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
            <a href="/" className="text-light text-decoration-none">
              Terms of Service
            </a>{" "}
            |{" "}
            <a href="/" className="text-light text-decoration-none">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
