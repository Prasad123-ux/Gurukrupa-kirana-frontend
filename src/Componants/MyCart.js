import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt,  FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; 
import Loader from "./Loader";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "./Redux/jobSlice";



const MyCart = ({ navigateToOrder }) => {
  const token = localStorage.getItem("TOKEN")
  // const [cartItems, setCartItems] = useState([]);  
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate=useNavigate() 
  const [loading,setLoading]= useState(true) 
  const [error, setError]= useState()  
  const cartItems= useSelector((state)=>state.products.cartData) 
  const dispatch= useDispatch()

const [quantity, setQuantity]= useState()
 


      const notifySuccess = (message) => toast.success(message);
      const notifyError = (message) => toast.error(message);
      const notifyInfo = (message) => toast.info(message);
      const notifyWarning = (message) => toast.warning(message);
  
     
      //  const deleteCart = (id) => {
      //   const filteredItem= cartItems.filter((item)=> item._id!==id) 
      //   dispatch(setCartData(filteredItem))
      //   // setCartItems(filteredItem)
        
      //  };
      

      // const deleteCart = useCallback((id) => {
      //   setCartItems((prevItems) => Array.isArray(prevItems) ? prevItems.filter(item => item._id !== id) : []);
      // }, []);

useEffect(()=>{   
  // window.scrollTo(0,0)
  

  const handleMyCartData=async()=>{  
    // console.log(cartData.length)  
    console.log(cartItems.length)
    if(cartItems.length===0){
      console.log("cartData fetching from DB") 
      console.log(cartItems)

    
    try{
      const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/getCartData", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({token:token})
      })
      if(!response.ok){
        const errorText = await response.text();
      
        throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
        

      }  

      const data = await response.json()   
      console.log(data.data) 
      

      dispatch(setCartData(data.data[0] ||[]))
      // setCartItems(data.data[0] || []) 
   


    }catch(err){ 
      notifyError(err.message)
      setError(err.message)
      // setError("Internal Server Error")

    }finally{
      setLoading(false)

    }

  }else{
      setLoading(false) 
      console.log('WE ARE FINDING FROM REDUX')
      // console.log(cartData)
    dispatch(setCartData(cartItems)) 
    console.log("this is cartItems")
    console.log(cartItems)
    console.log(cartItems.length)
    }
  } 

handleMyCartData() 



},[token])



const handleDeleteItem=async(id)=>{ 
  console.log(id)
  try{
    
    const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/deleteCartItem", {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({id, token:token})
    })
    if(!response.ok){
      const errorText = await response.text();
      
         throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
        
    }
      const data = await response.json() 
     
       
      console.log(cartItems)
      // console.log(cartItems.filter((item)=>item._id!==id))
      notifyWarning("ठीक आहे, आम्ही लवकरच हटवू.")
      const filteredProduct=cartItems.products.filter((product)=>product._id!==id)
      dispatch(setCartData({...cartItems,products:filteredProduct }))
    
    

  }catch(err){ 
     notifyError("हटवले नाही...! कृपया पुन्हा प्रयत्न करा.", err.message) 


  }

}
 








 const handleSelectItem = (id) => { 
  console.log(id)
  console.log(selectedItems)
//   // Update the selectedItems state
   setSelectedItems((prev) => {
    
     const isSelected = prev.some((item) => item._id === id);
  
     if (isSelected) {
      // notifyInfo("आयटम निवड रद्द केली")
     
return prev.filter((item) => item._id !== id);
     } else {
   

       const selectedItem = cartItems.products.find((item) => item._id === id); 
      //  notifyInfo("आयटम नि/वडले")
  if (selectedItem) {
         return [...prev, { ...selectedItem, selected: true }];
       }
       return prev; // Return the current state if no item is found
     }
   });
 };



 useEffect(() => {
  console.log("Cart updated:", cartItems);
}, [cartItems]); //

 const getQuantity = (e, id) => { 
  console.log(quantity)
  
  const finded = selectedItems.some((item) => item.productID === id);

 
  if (finded) {
    // Update selectedItems with the new quantity
   const  selectedItem= selectedItems.map((item) =>
      item.productID === id ? { ...item, quantity: e.target.value } : item
    );

  setSelectedItems(selectedItem)
    calculateTotal();
  }
};  




  const handleBilling = () => {
    if (selectedItems.length === 0) { 
      
      // alert("Please select at least one item for billing!");  
      notifyWarning("कृपया बिलिंगसाठी किमान एक आयटम निवडा!")

      return;
    }
    navigate("/orderCompletion", { state: { selectedItems } });
  }; 

 const calculateTotal = () =>selectedItems && selectedItems.length>=0 ? selectedItems.reduce((total, item) => total + item.productPrice * item.quantity, 0):"0" 


  
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


      <h3 className="text-center fw-bold mb-4">माझी कार्ट</h3>
      <div className="row gy-3"> 




         
          {loading ? (
                  <div className="text-center"style={{alignItems:"center"}}><Loader/></div>
                ) : error ? (
                  <div className="text-danger text-center">{error}</div>
                ) :
        
                cartItems?.products?.length >= 1 ? cartItems.products.map((item, index) => ( 

          

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
                src={item.productImg}
                alt={item.productName}
                className="card-img-top" 
                onClick={()=>{handleDetail(item.productID)}}
                style={{
                  height: "100px",
                  objectFit:"fill",
                }}
                whileHover={{ scale: 1.2 }}
              />
              <div className="card-body p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <motion.h6
                    className="fw-bold text-dark mb-1"
                    whileHover={{ scale: 1.05, color: "#007bff" }}
                  >
                    {item.productName}/{item.productCategory}
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
                
                </p>
                <p className="fw-bold text-primary mb-2">₹{item.productPrice} per {item.productUnit}</p>
                {/* <p className="fw-bold">{itemQuantity===0 ? item.quantity:itemQuantity } {item.unit}</p> */}
                <div className="d-flex align-items-center my-3">
              <label htmlFor="quantity" className="me-2 fw-bold">
              प्रमाण :
              </label>
              <input
                type="number"
                id="quantity"
                // value={item.quantity}
                  placeholder={item.quantity }
                min="1" 
                max="50" 
                 value={quantity}
                // onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))} 
                onChange={(e)=>{getQuantity(e, item.productID)}}
                className="form-control"
                style={{ width: "80px" }}
              />  
            </div>
              
                <motion.button
                  className="btn btn-danger btn-sm mt-3 w-100"
                  onClick={() => handleDeleteItem(item._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrashAlt />हटवा
                </motion.button>
              </div>
            </div>
          </motion.div>
        )): <h6 className="text-center fw-bold mb-4">एकही वस्तू सापडली नाही...!</h6>
        
        
        
        }






















      </div>

      { cartItems.products&& cartItems.products.length>=1 ?  
      <div
        className="p-3 shadow-sm bg-light rounded"
        style={{ position: "sticky", bottom: "0", zIndex: "1000" }}
      >
        <h5 className="fw-bold">
        एकूण: ₹{calculateTotal()} ({ selectedItems.length}{" "})
        वस्तू
        </h5>
        <motion.button
          className="btn btn-success w-100"
          onClick={handleBilling}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          बिलिंगसाठी पुढे जा
        </motion.button>
      </div>
:<div className="text-center"> 
   <h6 className="text-center fw-bold mb-4">तुमची कार्ट रिकामी आहे! 🛒
   वस्तू जोडा आणि तुमच्या आवडत्या वस्तूंची खरेदी सुरू करा. 😊</h6>

   <Link to="/home" className="text-center">उत्पादने एक्सप्लोर करा</Link>
  
  </div>}
    </div>
  );
};

export default MyCart