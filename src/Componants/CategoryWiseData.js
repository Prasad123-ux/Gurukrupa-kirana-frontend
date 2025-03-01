import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Styles/Home.css"; 
import { FaRupeeSign } from "react-icons/fa"; 
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";
import { useSelector } from "react-redux";



const productCardVariants = { 
  
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
  }),
  hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" },
};

function CategoryWiseData() {
    const [bugs, setBugs]= useState()
    const {category}= useParams()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate= useNavigate()  
  const allData= useSelector((state)=>state.products.productData)
 
 const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = () => toast.info('This is an info message!');
  const notifyWarning = () => toast.warning('This is a warning message!');





  useEffect(() => {
  
    window.scrollTo(0,0) 

    if (allData.length===0){
      
    }
    const getProductData = async () => {
      if (allData.length===0){


      try {
        const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/categoryWiseData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({category})
        });

        if (!response.ok) {
          const errorText = await response.text();
          setBugs(errorText)
          throw new Error(`${errorText}`);
        }

        const data = await response.json(); 
        console.log(data)
        setProducts(data.data || []);
      } catch (err) {
        notifyError(err.message)
        setError(err.message);
      } finally {
        setLoading(false);
      }

    }else{
      setLoading(false)
      const categoryData= allData.filter((item)=>item.productCategory===category) 
      setProducts(categoryData)

    }
    };

    getProductData();
  }, [category]); 


  const handleDetail=(id)=>{ 
    console.log(id)
    navigate(`/ProductDetails/${id}`)

  }

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}
      className="home"
    >
      {/* Small Navbar for Categories */} 
      <ToastContainer/>
    

      {/* Carousel Section */}
      

      {/* Product Cards Section */}
      <motion.div className="container mt-4">
        <h5 className="fw-bold text-center mb-4">{category}</h5>
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
          <div className="text-center">{`कोणतीही उत्पादने उपलब्ध नाहीत, लवकरच आम्ही ${category} या विभागात उत्पादने जोडू.`} </div>
        )}
      </motion.div>
    </div>
  );
}

export default CategoryWiseData;
