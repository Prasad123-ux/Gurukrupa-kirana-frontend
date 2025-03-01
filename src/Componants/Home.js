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
import { FiShare2 } from "react-icons/fi";
import { FiPlus, FiMinus } from "react-icons/fi" 
import {useSelector}  from "react-redux"
import { useDispatch } from "react-redux";
import { setAllProducts, setCartData } from "./Redux/jobSlice";


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
  // const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate= useNavigate()
  const [itemValue, setItemValue]= useState(1)
  const [category, setCategory]= useState([])
  const token= localStorage.getItem("TOKEN")
const [cart, setCart]= useState({})   
const [quantity, setQuantity]= useState(1) 
const products= useSelector((state)=>state.products.productData) 
const dispatch= useDispatch()

// const [products, setProducts]= useState([])

  

    const handleCategoryData=(category)=>{  
      if (!token){
        window.scrollTo(0,0)
        notifyError("Please Login Yourself")
        return 
        
      }else{
        navigate(`/categoryData/${category}`)
        window.scrollTo(0,0)
  
       
      }
     
  
    }

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

 




  useEffect(() => { 
    window.scrollTo(0,0);
    // dispatch(setAllProducts(products))
  
   
      
  
    const getProductData = async () => { 
      if ( products.length ===0){ 
        
        
      
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
        dispatch(setAllProducts(data.data)); // Save data in Redux store
  
        // Extract unique categories and update state
        const uniqueCategories = [...new Set(data.data.map(item => item.productCategory))];
        setCategory(uniqueCategories);
  
        // notifySuccess("Products loaded successfully!");
      } catch (err) {
        notifyError(err.message);
      } finally {
        setLoading(false);
      }
    }else{ 
      console.log("data not fetching ")  
      setLoading(false)
      const uniqueCategories = [...new Set(products.map(item => item.productCategory))];
        setCategory(uniqueCategories);
      console.log(products)
    dispatch(setAllProducts(products))
    }
  
  }
 
    getProductData(); 
    
  
  

  }, [products, dispatch]); // Dependencies ensure fetching only if products are empty
  


  


  const handleDetail=(id)=>{ 
    console.log(id)
    navigate(`/ProductDetails/${id}`)

  }

  // const handleCategoryData=(category)=>{ 
  //   navigate(`/categoryData/${category}`)

  // }
  const addCart =async (productName, productCategory, productPrice, productUnit, productImg, productID ) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productID]: (prevCart[productID] || 0) + 1,
    }));  
    // let quantity = parseInt(product.quantity, 10);

    const updatedCartData = {
      productName,
      productCategory,
      productPrice,
      productUnit,
      productImg,
      productID,
      quantity: Number(quantity) || 1

    };
    console.log(typeof(updatedCartData.quantity))
    notifySuccess("वस्तू कार्टमध्ये जोडली गेली.")

    try{
      const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/addToCart", { 
    
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({ token:token, cartData:updatedCartData})
      })
      if(!response.ok){
       const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
      }else{ 
        const data = await response.json()
         dispatch(setCartData([]))
       
      
    }
    }catch(err){
      notifyError(err.message)
    
       }
    };





    

  const cartIncrement = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
    console.log(cart)
  };

  const cartDecrement = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId]; // Remove item if quantity reaches 0
      }
      return newCart;
    });
    console.log(cart)
  };


  console.log(products)

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
        { category && category.length>=0  ? category.map((name, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            className="d-inline-block mx-3"
            // style={{
            //   width: "100%",
            //   height: "100%",
            //   borderRadius: "50%",
            //   backgroundColor: "#f8f9fa",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            //   cursor: "pointer",
            //   padding: "10px",  
            //   // fontSize


            // }}
            onClick={()=>{handleCategoryData(name)}}

          >
            <span style={{ fontSize: "10px" }}>{name}</span>
          </motion.button>
        )):""}
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
                src="https://res.cloudinary.com/det3aoore/image/upload/v1740020557/5gB_sMvwavcDxq60EL-LIobryUCqgtFEe9mvlZPPEFti7Iwv2Gp8GwzjjvkZHb4EpTqmVEcpfZ7oBJO8NWorrpuL3Pkt1U8BxTln7RddVkwheSJpbU1KRGXcvJHLS155FmIcbnYNeUE5uqW_XW9T6Sw_hti55i.webp"
                className="d-block w-100"
                alt="Welcome to Gurukrupa kirana"
                style={{height:"500px"}}
                
              />
            </div>
            <div className="carousel-item">
              <img
              src="https://res.cloudinary.com/det3aoore/image/upload/v1740020889/24657a_308b429d59884ce98c13649db36c8a04mv2-1-1_kfurfr.png"

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
        <h5 className="fw-bold text-center mb-4">आमची उत्पादने</h5>
         {/* <button className="btn btn" onClick={notifySuccess}> SUCCESS</button> */}
         <ToastContainer autoClose={7000}/>
          
        {/* </button> */}
        <motion.div className="container mt-4">
        {/* <h5 className="fw-bold text-center mb-4">आमची उत्पादने</h5> */}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ) : products.length > 0 ? (
          <div className="row g-3">
            {   products.map((product, i) => (
              <motion.div
                key={product._id}
                className="col-6 col-md-4 col-lg-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              >
                <div className="card border-0 shadow-sm p-2" style={{ borderRadius: "12px", textAlign: "center", backgroundColor: "#fff" }}>
                  <img
                    src={product.productLink[0]}
                    className="card-img-top mx-auto"
                    style={{ maxWidth: "100%", maxHeight: "100px", cursor: "pointer" }}
                    alt={product.productName}
                    onClick={() => handleDetail(product._id)}
                  />
                  <div className="card-body mt-1">
                    <h6 className="fw-bold text-truncate">{product.productName}</h6>
                    <p className="text-muted mb-1">{product.productCategory}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">
                        <FaRupeeSign /> {product.productPrice}
                      </span>
                    </div>

                    {/* Add to Cart or Quantity Selector */}
                    {cart[product._id] ? (
                      <div className="d-flex justify-content-center align-items-center mt-2">
                        <button className="btn btn-danger btn-sm" onClick={() => cartDecrement(product._id)}>
                          <FiMinus />
                        </button>
                        <span className="mx-2">{cart[product._id]}</span>
                        <button className="btn btn-success btn-sm" onClick={() => cartIncrement(product._id)}>
                          <FiPlus />
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-primary mt-2 w-100" onClick={() => addCart(product.productName, product.productCategory, product.productPrice, product.productUnit, product.productLink[0], product._id )}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center">No products found</div>
        )}
      </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;
