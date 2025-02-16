import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt,  FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; 
import Loader from "./Loader";



const MyCart = ({ navigateToOrder }) => {
  const token = localStorage.getItem("TOKEN")
  const [cartItems, setCartItems] = useState([]);  
  const [itemQuantity,setItemQuantity]= useState(0)  
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate=useNavigate() 
  const [loading,setLoading]= useState(true) 
  const [error, setError]= useState()



      const notifySuccess = (message) => toast.success(message);
      const notifyError = (message) => toast.error(message);
      const notifyInfo = (message) => toast.info(message);
      const notifyWarning = (message) => toast.warning(message);
  

useEffect(()=>{   
  // window.scrollTo(0,0)
  

  const handleMyCartData=async()=>{
    try{
      const response= await fetch("http://localhost:7000/api/user/getCartData", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({token:token})
      })
      if(!response.ok){
        const errorText = await response.text();
      
        throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
        

      }  

      const data = await response.json()  
      
      setCartItems(data.data) 
   



    }catch(err){ 
      notifyError(err.message)
      setError(err.message)
      // setError("Internal Server Error")

    }finally{
      setLoading(false)

    }
  } 

handleMyCartData()
},[token])



const handleDeleteItem=async(id)=>{ 
  console.log(id)
  try{
    const response= await fetch("http://localhost:7000/api/user/deleteCartItem", {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({id, token:token})
    })
    if(!response.ok){
      const errorText = await response.text();
      
         throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
        
    }else{
      const data = await response.json()
      notifySuccess(data.message)
      notifyWarning("If its Showing all items are deleted then refresh the page")
       deleteCart(id)
    }

  }catch(err){ 
    notifyError("Not deleted..! Please try again") 


  }

}
 



const deleteCart = (id) => {
  setCartItems((prevItems) => (Array.isArray(prevItems) ? prevItems.filter((item) => item._id === id) : []));
};




 const handleSelectItem = (id) => {
//   // Update the selectedItems state
   setSelectedItems((prev) => {
    
     const isSelected = prev.some((item) => item._id === id);
  
     if (isSelected) {
      notifyInfo("item dis-selected")
     
//       // Remove the item from selectedItems
       return prev.filter((item) => item._id !== id);
     } else {
      notifyInfo("item selected")
//       // Find the item in cartItems and add it to selectedItems
       const selectedItem = cartItems.products.find((item) => item._id === id);
  if (selectedItem) {
         return [...prev, { ...selectedItem, selected: true }];
       }
       return prev; // Return the current state if no item is found
     }
   });
 };



 



  

  const handleBilling = () => {
    if (selectedItems.length === 0) { 
      
      // alert("Please select at least one item for billing!");  
      notifyWarning("Please select at least one item for billing!")

      return;
    }
    navigate("/orderCompletion", { state: { selectedItems } });
  };



const calculateTotal = () =>
    
       selectedItems && selectedItems.length>=1 ? selectedItems.reduce((total, item) => total + item.price * item.quantity, 0):" 0" 


  
       const handleDetail=(id)=>{ 
        console.log(id)
        navigate(`/ProductDetails/${id}`)
    
      }
  

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9fafb",
        padding: "20px",
        minHeight: "100vh",
        paddingTop:"120px"
      }}
    >      
    <ToastContainer/>


      <h3 className="text-center fw-bold mb-4">My Cart</h3>
      <div className="row gy-3"> 




         
          {loading ? (
                  <div className="text-center"style={{alignItems:"center"}}><Loader/></div>
                ) : error ? (
                  <div className="text-danger text-center">{error}</div>
                ) :
        
        cartItems.products && cartItems.products.length>=1 ?  cartItems.products.map((item, index) => ( 


          <motion.div
            key={item._id}
            className="col-6 col-md-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
              }}
            >
                <motion.img
                src={item.image}
                alt={item.name}
                className="card-img-top" 
                onClick={()=>{handleDetail(item.id)}}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
                whileHover={{ scale: 1.2 }}
              />
              <div className="card-body p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <motion.h6
                    className="fw-bold text-dark mb-1"
                    whileHover={{ scale: 1.05, color: "#007bff" }}
                  >
                    {item.name}/{item.category}
                  </motion.h6>
                  <motion.div
                    onClick={() => handleSelectItem(item._id)}
                    className={`btn ${selectedItems.some((i) => i._id === item._id) ? "bg-success" : "btn-success"}`}
                    style={{
                      backgroundColor: item.selected ? "#28a745" : "#ccc",
                      color: "#fff",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                </div>
                <p
                  className="small text-muted mb-1"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.description}
                </p>
                <p className="fw-bold text-primary mb-2">₹{item.price*item.quantity}</p>
                <p className="fw-bold">{itemQuantity===0 ? item.quantity:itemQuantity } {item.unit}</p>
              
                <motion.button
                  className="btn btn-danger btn-sm mt-3 w-100"
                  onClick={() => handleDeleteItem(item._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrashAlt /> Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        )): <h6 className="text-center fw-bold mb-4">No items Found...!</h6>
        
        
        
        }






















      </div>

      { cartItems.products && cartItems.products.length>=1 ?  
      <div
        className="p-3 shadow-sm bg-light rounded"
        style={{ position: "sticky", bottom: "0", zIndex: "1000" }}
      >
        <h5 className="fw-bold">
          Total: ₹{calculateTotal()} ({ selectedItems.length}{" "})
          items
        </h5>
        <motion.button
          className="btn btn-success w-100"
          onClick={handleBilling}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Billing
        </motion.button>
      </div>
:<div className="text-center"> 
   <h6 className="text-center fw-bold mb-4">Your cart is empty! 🛒 Add items to your cart and start shopping your favorites.</h6>

   <Link to="/home" className="text-center">Explore Products</Link>
  
  </div>}
    </div>
  );
};

export default MyCart