import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useParams } from "react-router-dom"; 
import "../Styles/ProductDetail.css"; 
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';



function ProductDetails() {
  const [quantity, setQuantity] = useState(1);  
  const [product, setProduct] = useState(null); // Initial state as null for better checks 
  const [total,setTotal]= useState()
  const { id } = useParams(); // Correct usage of useParams 
  const navigate= useNavigate() 
  const token= localStorage.getItem("TOKEN") 
  const [loading, setLoading]= useState(true) 
  const [error, setError]= useState(null)
  const [cartLoading, setCartLoading]= useState(false)



    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);



  const getProductDetail = async () => { 
    try {
      const response = await fetch(`https://gurukrupa-kirana-backend.onrender.com/api/user/getProductDetail/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        notifyError("We could not find product Please find another product")
        setError(errorText)
        //  throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setProduct(data.data);
      // notifySuccess(data.message)
    } catch (err) {
       notifyError("Internal Server Error")
      // console.error(err);
    }
    finally{
      setLoading(false)
    }
  };  


  useEffect(() => { 
    window.scrollTo(0,0)

    if (id) {
      getProductDetail(); 
      console.log(product)
    }
  }, [id]); // Ensure id is a dependency 


  

  const calculatePrice = (price) => {
    if (!product) return "0.00"; // Handle case where product is not yet available
    let finalPrice = price * quantity;
    const offer = product.offers.find((o) => quantity >= o.quantity);
    if (offer) {
      finalPrice -= (finalPrice * parseInt(offer.discount)) / 100;
    }
    return finalPrice.toFixed(2);
  };
 




  // if (!product) {
  //   return <div><Loader/></div>; 
    
  // }
    
    // Show a loading state while data is fetched
  


 
const addToCart=async()=>{ 
  setCartLoading(true)

  try{
  
  const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/addToCart", { 

    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({id:id, quantity:quantity ,price: product && product.productPrice >=0 ?product.productPrice:"",category: product && product.productCategory.length >=0 ?product.productCategory:"",token:token, name: product && product.productName.length >=0 ?product.productName:"" ,unit: product && product.productUnit.length >=0 ?product.productUnit:"",image: product && product.productLink.length >=0 ?product.productLink:""})
  })
  if(!response.ok){
    
  
    const errorText = await response.text();
  
    
     throw new Error(`Request failed with status ${response.status}: ${errorText}`); 

    

  }else{
    const data = await response.json()
    notifySuccess(data.message)
    
}
}catch(err){
  notifyError(err.message)

  


}finally{
  setCartLoading(false)

}

}
  






  

  return (
    <>{  loading ? (
              <div className="text-center"><Loader/></div>
            ) : error ? (
              <div className="text-danger text-center">{error}</div>
            ) : <div 
    
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px 0",
      }} 
      // className="product"
    >
      {/* Product Section */}
      <motion.div

        className="container product"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {  product && product.productName.length >= 0   ? 
        <div className="row align-items-center">
          <motion.div
            className="col-md-6 text-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              //  alt={product.name}
               src={ product && product.productLink.length >= 0  ? product.productLink[0]:" "}              alt="nothing"
              //  alt={product.name}
              style={{
                maxWidth: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </motion.div>
          <motion.div
            className="col-md-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }} 
          >
            <h3 className="fw-bold">{ product && product.productName.length >= 0  ? product.productName:" "}</h3>  
            <p className="text-muted mb-1">Category: {product&& product.productCategory.length >= 0  ? product.productCategory:" "}</p>
            <p className="text-muted">{product && product.productDescription.length >= 0  ? product.productDescription:" "}</p>
            <p className="text-success fw-bold">Price: { product && product.productPrice>=0  ? product.productPrice:" N/A"} per {product && product.productUnit ? product.productUnit :"" }</p>
              
            {/* Quantity Selector */}
            <div className="d-flex align-items-center my-3">
              <label htmlFor="quantity" className="me-2 fw-bold">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1" 
                max="50"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="form-control"
                style={{ width: "80px" }}
              />
            </div>
           
            {/* Total Price */}
            <p className="text-primary fw-bold">Total: {product && product.productPrice>=0  ? product.productPrice*quantity:" N/A"} </p>  

            {/* Order Button */}

            {product ? (
  product.productStockQuantity >= 1 ? (
    cartLoading ? (
      <Loader /> // Display the loader if loading is true
    ) : (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary px-4 py-2"
        style={{ borderRadius: "20px" }}
        onClick={addToCart}
      >
        Add to Cart
      </motion.button>
    )
  ) : (
    <span>Item Not Available</span> // Inform user that the item is unavailable
  )
) : (
  <Loader /> // Handle case when product is null or undefined
)}

          </motion.div>
        </div> 
  :<div className="text-center">oops..! Try again . We don't have information about product </div>  }
      </motion.div>

    

      {/* About Section */}
      <motion.div
        className="container mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="fw-bold text-center mb-4">About Our Store </h4>
        <p className="text-muted text-center">
          Welcome to our grocery store! We provide the freshest produce and high-quality items for your everyday needs.
          Our mission is to deliver excellence and ensure every customer is satisfied. Thank you for choosing us!
        </p>
      </motion.div>
      <ToastContainer autoClose={4000}/>
    </div>
}</>

  );
}

export default ProductDetails;
