import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Styles/Home.css"; 
import { FaRupeeSign } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Loader from "./Loader";

const categories = ["Biscuits", "Soaps", "Shampoo", "Washing Powder", "ToothPaste", "Tea Powder", "Masala", "Hair Oil", "Sweets", "Nuts"];

const productCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
  }),
  hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" },
};

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate= useNavigate()


  const notifyError = (message) => toast.error(message);




  useEffect(() => {
    window.scrollTo(0,0)
    const getProductData = async () => {
    
      try {
        const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/getProductData", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json(); 
        // toast.success("data fetched successfully")
        
        console.log(data)
        setProducts(data.data || []);
        //  notifySuccess("Proceed with products")
      } catch (err) {
    
        notifyError(err.message )
      } finally {
        setLoading(false);
        // toast.error('Internal Server Error')
      }
    };

    getProductData();
  }, []); 


  const handleDetail=(id)=>{ 
    console.log(id)
    navigate(`/ProductDetails/${id}`)

  }

  const handleCategoryData=(category)=>{ 
    navigate(`/categoryData/${category}`)

  }

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}
      className="home"
    >
      {/* Small Navbar for Categories */}
      <div className=""
        style={{
          height: "60px",
          backgroundColor: "#fff",
          display: "flex",
          position: "fixed",
          zIndex: "1000",
          top: "75px",
          width: "100%",
          padding: "10px",
          alignItems: "center",
          overflowX: "auto",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",  
        
          // fontSize:"0.1rem"
        }}
      >
        {categories.map((name, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            className="d-inline-block mx-3"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              padding: "10px",  
              // fontSize


            }}
            onClick={()=>{handleCategoryData(name)}}

          >
            <span style={{ fontSize: "10px" }}>{name}</span>
          </motion.button>
        ))}
      </div>

      {/* Carousel Section */}
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ marginTop: "100px" }}
      >
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://res.cloudinary.com/det3aoore/image/upload/v1736834483/product_images/WhatsApp_Image_2025-01-14_at_11.28.35_3399fccf_ij5ssi.jpg"
                className="d-block w-100"
                alt="Welcome to Gurukrupa kirana"
                style={{height:"500px"}}
                
              />
            </div>
            <div className="carousel-item">
              <img
              src="https://res.cloudinary.com/det3aoore/image/upload/v1736834503/product_images/WhatsApp_Image_2025-01-14_at_11.28.35_5efcd127_uc8s3h.jpg"

                className="d-block  w-100"
                alt="Fresh Groceries Everyday"
                style={{height:"500px"}}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Cards Section */}
      <motion.div className="container mt-4">
        <h5 className="fw-bold text-center mb-4">Explore Our Products</h5>
         {/* <button className="btn btn" onClick={notifySuccess}> SUCCESS</button> */}
         <ToastContainer autoClose={7000}/>
          
        {/* </button> */}
        {loading ? (
          <div className="text-center"><Loader/></div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ) : products.length > 0 ? (
          <div className="row g-3">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="col-6 col-md-4 col-lg-3"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={productCardVariants}
                whileHover="hover"
              >
                <div
                  className="card border-0 shadow-sm p-2"
                  onClick={()=>{handleDetail(product._id);}}
                  style={{
                    borderRadius: "12px",
                    textAlign: "center",
                    fontSize: "12px",
                    height: "200px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={product.productLink[0]}
                    className="card-img-top mx-auto"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                    alt={product.name || "Product"}
                  />
                  <div className="card-body">
                    <h6 className="fw-bold text-truncate">{product.productName}</h6>
                    <p className="text-muted mb-1">{product.productCategory}</p>
                    <p className="text-success fw-bold fs-6"> <FaRupeeSign /> {product.productPrice} / {product.productUnit}</p>
                  </div>
               
                </div>
              </motion.div>
              
            ))}
          </div>
        ) : (
          <div className="text-center"><span>No products Available ?  </span>
          <Link to="/contact">Contact us </Link> </div>
        )}
      </motion.div>
    </div>
  );
}

export default HomePage;
