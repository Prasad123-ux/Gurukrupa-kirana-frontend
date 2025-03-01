import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { FaCreditCard, FaMoneyBillAlt, FaWallet, FaMobileAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useLocation } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setOrdersData } from "./Redux/jobSlice";






const OrderCompletion = () => {
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Store Pickup");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userName,setUserName]= useState()
  const [mobileNumber,setMobileNumber]= useState() 
  const token= localStorage.getItem("TOKEN") 
  const [total, setTotal]= useState(0) 
  const [loading, setLoading]= useState(true) 
  const [error, setError]= useState()
  const[orderLoading, setOrderLoading]= useState(false)
 const [aboveT, setAboveT]= useState(false)
 
  const location = useLocation();
  const { selectedItems } = location.state || {}; 
  const dispatch= useDispatch()
  // Mock user and cart data 



 const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = () => toast.info('This is an info message!');
  const notifyWarning = (message) => toast.warning(message);

useEffect(()=>{
  console.log(selectedItems)
  const totalPrice= selectedItems && selectedItems.length>=0 ? selectedItems.reduce((total, item)=>total+(item.productPrice*item.quantity),0) :"" 
  if(totalPrice>=1000){
    setAboveT(true)
  }
  else{
    setDeliveryOption("Store Pickup")
  }
if (deliveryOption==="home"  ){
 setTotal(totalPrice+20)
}else{

  setTotal(totalPrice)
}
},[selectedItems,deliveryOption,total])

  useEffect(()=>{ 



    const getUserData=async()=>{ 
      try{
const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/getUserData" , { 
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
    if (!address || address.length<=5  ) {
      notifyWarning("कृपया तुमचा पत्ता यशस्वीरित्या प्रविष्ट करा.")
  return;
    }
    setOrderLoading(true)
    
    try{
      const response=await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/saveMyOrder", {
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({ userName:userName, mobileNumber:mobileNumber,address: address,deliveryOption: deliveryOption, paymentMethod:paymentMethod, total:total, id: selectedItems[0]._id, items:selectedItems})
      })



      if(!response.ok){
         const errorText = await response.text();
  
  throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
  
      }else{
        const data =await response.json()
        console.log(data)
        setOrderPlaced(true);
        dispatch(setOrdersData([]))
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
    doc.text("गुरुकृपा किराणा सावरगाव", 80,10)
    // doc.text("Order Receipt", 10, 20);
  
    // User Info
    doc.text(`वापरकर्त्याचे नाव: ${userName}`, 10, 20);
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
      const itemText = `${index + 1}. ${item.productName}  = ${item.productPrice}*${item.quantity} = ₹${item.productPrice}`;
      doc.text(itemText, 10, currentY); // Render text
      currentY += lineHeight; // Move Y down
    });
  
    
    // Total Price
    currentY += 10; // Add extra spacing
    doc.text(`एकूण किंमत: ₹${calculateTotal()}`, 10, currentY);
  
    // Footer
    currentY += 20;
    const footerText = "आमच्यासोबत खरेदी केल्याबद्दल धन्यवाद! गुरुकृपा किराणा नेहमीच तुमच्या सोबत असेल. 😊🛒";
    const wrappedFooter = doc.splitTextToSize(footerText, 180);
    doc.text(wrappedFooter, 10, currentY);
  
    // Save the PDF
    doc.save("गुरुकृपा किराणा.pdf");
  };
  
  


 


  const calculateTotal = () => {
    let total = selectedItems && selectedItems.length>=1 ? selectedItems.reduce(
      (sum, item) => sum + item.productPrice * item.productPrice,
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
                    src={item.productImg}
                    alt={item.productName}
                    style={{ maxWidth: "100%", borderRadius: "10px" }}
                  />
                  <h5 className="fw-bold mt-3">{item.productName}</h5>
                  <p>{item.description}</p>
                  <p className="text-primary fw-bold">
                  किंमत: ₹ {item.productPrice} x {item.quantity} {item.productUnit}
                  </p>
                  <p className="text-success fw-bold">
                  उपएकूण: ₹ {item.productPrice * item.quantity}
                  </p>
                </motion.div>
              </div>

            )):""}
          </div>

          {/* Address Section */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
          <h5 className="fw-bold">एकूण किंमत</h5>
          <p>
              
              <strong className=" bg-light text-danger shadow-sm rounded">  ₹ {total}</strong> 
              {deliveryOption==="home" ?  <span> (₹20 घरपोच वितरण शुल्क जोडले गेले







)  </span>:""}
            </p>
            <hr></hr>

            <h5 className="fw-bold">वापरकर्ता तपशील</h5>
            <p>
              <strong> नाव:</strong> {userName} <br />
              <strong>Mobile:</strong> {mobileNumber}
            </p>
            <h5 className="fw-bold">पत्ता प्रविष्ट करा</h5>
            <textarea
              className="form-control"
              placeholder="पत्ता प्रविष्ट करा"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Delivery Options */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            {/* <h5 className="fw-bold"></h5> */}
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
              घरपोच डिलिव्हरी (फक्त 1000 रुपयांपेक्षा जास्त ऑर्डरसाठी घरपोच डिलिव्हरी उपलब्ध आहे)
              </label>
            </div>
            <div className="form-check">
              <input
                checked={!aboveT ? true :false}
                type="radio"
                className="form-check-input"
                id="storePickup"
                value="store"
                // checked={deliveryOption === "Store Pickup"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <label className="form-check-label" htmlFor="storePickup">
              स्टोअर पिकअप (विनामूल्य)
              </label>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-4 bg-light p-3 shadow-sm rounded">
            <h5 className="fw-bold">पेमेंट पद्धत निवडा</h5>
            <i> <small>तांत्रिक अडचणींमुळे, आमचे ऑनलाइन पेमेंट पर्याय तात्पुरत्या अनुपलब्ध आहेत. कृपया कॅश ऑन डिलिव्हरी (COD) पर्याय वापरा. ऑनलाइन पेमेंट सेवा लवकरच पुन्हा सुरू होईल. </small></i>
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
              default
              
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
            ऑर्डर द्या
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
          <h3 className="fw-bold text-success">ऑर्डर यशस्वीरित्या दिले!

</h3>
          <p>तुमची ऑर्डर लवकरच डिलिव्हर केली जाईल. आमच्याकडून खरेदी केल्याबद्दल धन्यवाद!!</p>
          <button className="btn btn-primary" onClick={generateReceipt} >
          पावती डाउनलोड करा
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default OrderCompletion;
