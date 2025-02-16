import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { FaCreditCard, FaMoneyBillAlt, FaWallet, FaMobileAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useLocation } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";






const OrderCompletion = () => {
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userName,setUserName]= useState()
  const [mobileNumber,setMobileNumber]= useState() 
  const token= localStorage.getItem("TOKEN") 
  const [total, setTotal]= useState(0) 
  const [loading, setLoading]= useState(true) 
  const [error, setError]= useState()
  const[orderLoading, setOrderLoading]= useState(false)

 
  const location = useLocation();
  const { selectedItems } = location.state || {}; 
  // Mock user and cart data 



 const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = () => toast.info('This is an info message!');
  const notifyWarning = (message) => toast.warning(message);

useEffect(()=>{
  console.log(selectedItems)
  const totalPrice= selectedItems && selectedItems.length>=0 ? selectedItems.reduce((total, item)=>total+(item.price*item.quantity),0) :""
if (deliveryOption==="home"  ){
 setTotal(totalPrice+20)
}else{
  setTotal(totalPrice)
}
},[selectedItems,deliveryOption,total])

  useEffect(()=>{ 



    const getUserData=async()=>{ 
      try{
const response = await fetch("http://localhost:7000/api/user/getUserData" , { 
  method:"POST", 
  headers:{"Content-type":"application/json"},
  body:JSON.stringify({token})

})
if(!response){
  
  const errorText = await response.text();
  
  throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
  
}else{
  const data= await response.json()  
  console.log(data)
  setUserName(data.data.name)
  setMobileNumber(data.data.mobile_number)
  setAddress(data.address) 
 console.log(userName)
}
}catch(err){ 
        notifyError(err.message)
        setError("Internal Server Error")

 }finally{
  setLoading(false)
 }


    }

    getUserData()
  },[token,userName]) 






  const handleSaveOrder=async ()=>{
    if (!address || !paymentMethod || !deliveryOption) {
      notifyWarning("Please Fill all the details")
      return;
    }
    setOrderLoading(true)
    
    try{
      const response=await fetch("http://localhost:7000/api/user/saveMyOrder", {
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({ userName:userName, mobileNumber:mobileNumber,address: address,deliveryOption: deliveryOption, paymentMethod:paymentMethod, total:total, id: selectedItems[0]._id, items:selectedItems})
      })



      if(!response.ok){
         const errorText = await response.text();
  alert("there is some problem")
  throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
  
      }else{
        const data =await response.json()
        console.log(data)
        setOrderPlaced(true);
        notifySuccess("Order Placed Successfully")
        window.scrollTo(0,0)
        handleSubmit()
        
      }

    }catch(err){
      notifyError(err.message)

    }finally{
    setLoading(false)
    setOrderLoading(false)

    } 







  }

  const handleSubmit= async()=>{
  
    
  
  
  
    try{
      const response =await fetch('https://formspree.io/f/xzbnpgno',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({userName:userName, mobileNumber:mobileNumber,address: address,deliveryOption: deliveryOption, paymentMethod:paymentMethod, total:total, id: selectedItems[0]._id, items:selectedItems}),
      })
      if(response.ok){
    
        
      }else{
        
     }
    }catch(error){
    
      }finally{
      setLoading(false)
    }
  
  }
  




  const generateReceipt = () => { 





    


    const doc = new jsPDF();
  
    // Set font and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
  
    // Title
    doc.text("Gurukrupa Kirana Sawargaon", 80,10)
    // doc.text("Order Receipt", 10, 20);
  
    // User Info
    doc.text(`User Name: ${userName}`, 10, 20);
    doc.text(`Mobile: ${mobileNumber}`, 10, 30);
  
    // Cart Items Header
    doc.text("Cart Items:", 10, 40);
  
    // Cart Items
    const pageHeight = doc.internal.pageSize.height;
    let currentY = 50; // Initial position for items
    const lineHeight = 10;
  
    selectedItems.forEach((item, index) => {
      if (currentY > pageHeight - 20) {
        doc.addPage(); // Add new page
        currentY = 10; // Reset Y for new page
      }
      const itemText = `${index + 1}. ${item.name}  = ${item.price}*${item.quantity} = ₹${item.price}`;
      doc.text(itemText, 10, currentY); // Render text
      currentY += lineHeight; // Move Y down
    });
  
    
    // Total Price
    currentY += 10; // Add extra spacing
    doc.text(`Total Price: ₹${calculateTotal()}`, 10, currentY);
  
    // Footer
    currentY += 20;
    const footerText = "Thank you for shopping with us! Gurukrupa Kirana will be with you always.";
    const wrappedFooter = doc.splitTextToSize(footerText, 180);
    doc.text(wrappedFooter, 10, currentY);
  
    // Save the PDF
    doc.save("Gurukrupa_Kirana.pdf");
  };
  
  


 


  const calculateTotal = () => {
    let total = selectedItems && selectedItems.length>=1 ? selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ):""
    if (deliveryOption === "home" && total >= 500) {
      total += Math.ceil(total / 1000) * 20; // ₹20 for every ₹1000
    }
    return total.toFixed(2);
  };

  
  
 

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f3f4f6",
        padding: "20px",
        minHeight: "100vh",
        paddingTop:"100px"
      }}
    
    >
      {!orderPlaced ? (
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
            <ToastContainer/>
          {/* Cart Items Section */}
          <div className="row mb-4">
           {  selectedItems && selectedItems.length>=0 ? selectedItems.map((item) => (
              <div
                key={item.id}  
                className="col-md-4 mb-3 bg-light p-3 shadow-sm rounded"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                  <h5 className="fw-bold mt-3">{item.name}</h5>
                  <p>{item.description}</p>
                  <p className="text-primary fw-bold">
                    Price: ₹{item.price} x {item.quantity} {item.unit}
                  </p>
                  <p className="text-success fw-bold">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </motion.div>
              </div>

            )):""}
          </div>

          {/* Address Section */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
          <h5 className="fw-bold">Total Price</h5>
          <p>
              
              <strong>  ₹ {total}</strong> 
              {deliveryOption==="home" ?  <span> (₹ 20 Charges added for Home Delivery)  </span>:""}
            </p>

            <h5 className="fw-bold">User Details</h5>
            <p>
              <strong>Name:</strong> {userName} <br />
              <strong>Mobile:</strong> {mobileNumber}
            </p>
            <h5 className="fw-bold">Enter Address</h5>
            <textarea
              className="form-control"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Delivery Options */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            <h5 className="fw-bold">Delivery Option</h5>
            <div className="form-check">
              <input 
              disabled={total<=1000}
                type="radio"
                className="form-check-input"
                id="homeDelivery"
                value="Home Delivery"
                checked={deliveryOption === "home"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label className="form-check-label" htmlFor="homeDelivery">
                Home Delivery (Home Delivery only available for above than 1000 rupees of  order)
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="storePickup"
                value="store"
                checked={deliveryOption === "Store Pickup"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label className="form-check-label" htmlFor="storePickup">
                Store Pickup (Free)
              </label>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            <h5 className="fw-bold">Choose Payment Method</h5>
            <i> <small>Due to technical issues, our online payment options are temporarily unavailable. Please use the Cash on Delivery (COD) option.Online payment services will resume soon. </small></i>
            <div className="d-flex justify-content-around"> 
              <button
              disabled
                className={`btn ${
                  paymentMethod === "creditCard" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setPaymentMethod("creditCard")}
              >
                <FaCreditCard size={24} /> Credit Card
              </button>
              <button 
              disabled
                className={`btn ${
                  paymentMethod === "upi" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <FaMobileAlt size={24} /> UPI
              </button>
              <button
              disabled
                className={`btn ${
                  paymentMethod === "wallet" ? "btn-warning" : "btn-outline-warning"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <FaWallet size={24} /> Wallet
              </button>
              <button
              selected
              
                className={`btn ${
                  paymentMethod === "cod" ? "btn-secondary" : "btn-outline-secondary"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <FaMoneyBillAlt size={24} /> Cash on Delivery
              </button>
            </div>
          </div>

          {/* Place Order Button */}
          {
            orderLoading  ?  <Loader/>:
          <motion.button
            className="btn btn-success w-100"
            onClick={handleSaveOrder}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Place Order
          </motion.button>

}
        </motion.div>
      ) : (
        <motion.div
          className="container text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="fw-bold text-success">Order Placed Successfully!</h3>
          <p>Your order will be delivered soon. Thank you for shopping with us!</p>
          <button className="btn btn-primary" onClick={generateReceipt} >
            Download Receipt
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default OrderCompletion;
