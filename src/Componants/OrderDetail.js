import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
import { motion } from "framer-motion"; 
import { FaTruck, FaCreditCard } from "react-icons/fa"; 
import "../Styles/OrderDetail.css"




export default function OrderDetail() { 
    const {id, innerID}=useParams()    
    const [loading, setLoading]= useState(true) 
    const [error, setError]= useState() 
    const [info, setInfo]= useState([])

 const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = () => toast.info('This is an info message!');
  const notifyWarning = () => toast.warning('This is a warning message!'); 






useEffect(()=>{

const getAdminOrderDetail=async()=>{  
  try{
const response =await  fetch(`https://gurukrupa-kirana-backend.onrender.com/api/user/getOrderDetail/${innerID}`, {
    method:"GET", 
    headers: { "Content-Type": "application/json" },
    
})
if(!response.ok){
    const errorText = await response.text();
    throw new Error(`Request failed with status ${response.status}: ${errorText}`);

}else{
  const data = await response.json()   
  console.log(data)
  console.log(data.data)
  setInfo(data.data)

    
}
}catch(err){ 
  console.log(err.message)
  notifyError(err.message)

}finally{
  setLoading(false)

}
 }

getAdminOrderDetail()


},[innerID]) 

console.log(info) 






  return (
    <div className=' container orderDetail'>  
   <motion.div className="col-12" whileHover={{ scale: 1.03 }}>
  <div className="card shadow-sm p-4 text-center">
    <h5 className="fw-bold">Overall Summary</h5>
    <div className="row">
      <div className="col-6">
        <h6>Total Orders from {info?.userName || 'Unknown User'}</h6>
        <p className="text-primary fs-4 fw-bold">
          {Array.isArray(info?.orders) 
            ? info.orders.length 
            : 0}
        </p>
      </div>
      <div className="col-6">
        <h6>Total Income from {info?.userName || 'Unknown User'}</h6>
        <p className="text-success fs-4 fw-bold">
          ₹
          {Array.isArray(info?.orders) 
            ? info.orders.reduce((totalIncome, innerOrder) => totalIncome + (innerOrder.total || 0), 0) 
            : 0}
        </p>
      </div>
    </div>
  </div>
</motion.div>

      <ToastContainer/> 
       
{loading
? (
  <div className="text-center"><Loader/></div>
) : error ? (
  <div className="text-danger text-center">{error}</div>
): info.orders ?   info.orders.filter(item=>item._id===id).map((value)=>{

  return  <motion.div
  className="col-12"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 120, damping: 10 }}
>
  <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
    <div className="d-flex justify-content-between align-items-center">
      <h6 className="fw-bold mb-1">Order ID: <span className="text-muted">{value._id}</span></h6>
      <span className="text-muted small">Order Date: {new Date(value.placedAt).toLocaleDateString()}</span>
    </div>
    <hr />
    <p className="small text-muted"><strong>User:</strong> {info.userName} | {info.mobileNumber}</p>
    <p className="small text-muted"><strong>Address:</strong> {info.address}</p>
    <p className="small text-muted"><strong>Payment Type:</strong> {value.paymentMethod==="cod"?"Cash on delivery":"Home Delivery"} <FaCreditCard className="ms-2 text-primary" /></p>
    <p className="small text-muted"><strong>Delivery Type:</strong> {value.deliveryOption==="store" ? "Pick up from Store":"Delivered by Home"} <FaTruck className="ms-2 text-info" /></p>
    <p className="small text-muted"><strong>Total Price:</strong> ₹{value.total}</p>
    <div className="mt-3">
      <h6 className="fw-bold">Items Ordered:</h6>
      <div className="row gy-2">
        {value.items?.map((orderedItem, idx) => (
          <div key={idx} className="col-6 col-md-4">
            <motion.div
              className="d-flex align-items-center shadow-sm p-2 rounded"
              style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={orderedItem.image[0]} alt={orderedItem.itemName} style={{ width: "50px", height: "50px" }} className="me-2" />
              <div className="">
                <p className="mb-1 fw-bold small">{orderedItem.itemName} </p>
                <p className="text-muted small">Qty: {orderedItem.quantity} {orderedItem.unit}  </p>
                <p className="mb-1 fw-bold small"> Price: ₹ {orderedItem.price}/ {orderedItem.unit} </p>

                {/* <div className="mb-1 fw-bold small">₹ {orderedItem.price}/ {orderedItem.unit}</div> */}
              </div>
            </motion.div>
          </div>
        ))}
        
      </div>
    </div>
  </div>
</motion.div>
}):""}
      

      <div className="row gy-4 mr-5">  
        <h4>More Orders from <span className='fw-bold text-warning'>{info.userName}</span></h4>
           {loading ? (
                    <div className="text-center"><Loader/></div>
                  ) : error ? (
                    <div className="text-danger text-center">{error}</div>
                  ): info.orders ?  
           info.orders.map((item , index)=>{
              return ( 
                <motion.div
                  className="col-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                  <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-1">Order ID: <span className="text-muted">{item._id}</span></h6>
                      <span className="text-muted small">Order Date: {new Date(item.placedAt).toLocaleDateString()}</span>
                    </div>
                    <hr />
                    <p className="small text-muted"><strong>User:</strong> {info.userName} | {info.mobileNumber}</p>
                    <p className="small text-muted"><strong>Address:</strong> {info.address}</p>
                    <p className="small text-muted"><strong>Payment Type:</strong> {item.paymentMethod==="cod"?"Cash on delivery":"Home Delivery"} <FaCreditCard className="ms-2 text-primary" /></p>
                    <p className="small text-muted"><strong>Delivery Type:</strong> {item.deliveryOption==="store" ? "Pick up from Store":"Delivered by Home"} <FaTruck className="ms-2 text-info" /></p>
                    <p className="small text-muted"><strong>Total Price:</strong> ₹{item.total}</p>
                    <div className="mt-3">
                      <h6 className="fw-bold">Items Ordered:</h6>
                      <div className="row gy-2">
                        {item.items?.map((orderedItem, idx) => (
                          <div key={idx} className="col-6 col-md-4">
                            <motion.div
                              className="d-flex align-items-center shadow-sm p-2 rounded"
                              style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <img src={orderedItem.image[0]} alt={orderedItem.itemName} style={{ width: "50px", height: "50px" }} className="me-2" />
                              <div className="">
                                <p className="mb-1 fw-bold small">{orderedItem.itemName} </p>
                                <p className="text-muted small">Qty: {orderedItem.quantity} {orderedItem.unit}  </p>
                                <p className="mb-1 fw-bold small"> Price: ₹ {orderedItem.price}/ {orderedItem.unit} </p>

                                {/* <div className="mb-1 fw-bold small">₹ {orderedItem.price}/ {orderedItem.unit}</div> */}
                              </div>
                            </motion.div>
                          </div>
                        ))}
                        
                      </div>
                    </div>
                  </div>

                 


                  <div className="mt-4">
  <h6 className="fw-bold">Order Progress:</h6>
  <div className="progress" style={{ height: "5px", borderRadius: "5px" }}>
    <motion.div
      className="progress-bar"
      role="progressbar"
      style={{
        width: `${
          item?.progress && item.progress.length > 0
            ? (item.progress.length / 4) * 100
            : 0
        }%`,
        backgroundColor:
          item?.progress &&
          item.progress.length > 0 &&
          item.progress[item.progress.length - 1]?.status === "Delivered"
            ? "#28a745"
            : "#007bff",
      }}
    ></motion.div>
  </div>
  <ul className="list-group list-group-flush mt-3">
    {item?.progress && item.progress.length > 0 ? (
      item.progress.map((step, idx) => (
        <li
          key={idx}
          className="list-group-item d-flex justify-content-between align-items-center small"
        >
          <span>{step.status || "Status not available"}</span>
          <span className="text-muted">
            {step.date ? new Date(step.date).toLocaleDateString():"" || "Date not available"}
          </span>
          <span className="text-muted">
            {step.timing  || "Time not available"}
          </span>
        </li>
      ))
    ) : (
      <li className="list-group-item small text-muted">
        No progress information available
      </li>
    )}
  </ul>
</div>











                </motion.div>
              )

           }):"Order Not found"}
            </div> 
    </div>
  )
}
