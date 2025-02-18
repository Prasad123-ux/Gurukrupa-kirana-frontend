import React from 'react'
import Welcome from './Componants/Welcome'
import Navbar from './Componants/Navbar'
import Footer from './Componants/Footer'
import Home from './Componants/Home'
import ProductDetails from './Componants/ProductDetails'
import OrderCompletion from './Componants/OrderCompletion'
import MyCart from './Componants/MyCart'
import MyOrders from './Componants/MyOrders'
import Dashboard from './Componants/Dashboard'
// import Dashboard1 from './Componants/Dashboard1'
// import Dashboard1 from './Componants/Dashboard' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'   
import UserProfile from './Componants/UserProfile'
import ContactSection from './Componants/ContactSection'
import AboutSection from './Componants/AboutSection'
import AdminProductForm from './Componants/AdminProductForm'
import CategoryWiseData from './Componants/CategoryWiseData'
import Loader from './Componants/Loader'
import OrderDetail from './Componants/OrderDetail'
import Ratings from './Componants/Ratings'
import { Rating } from 'react-simple-star-rating'


export default function App() {
  return (
    <Router>
      
    <div>
    <Navbar/> 

<Routes>

      <Route  exact path="/" element={<Welcome/>}/> 
      <Route exact path="/home" element={<Home/>}/> 
      <Route exact path="/myCart" element={<MyCart/>}/> 
      <Route exact path="/myOrders" element={<MyOrders/>}/> 
      <Route exact path="/orderCompletion" element={<OrderCompletion/>}/>  
      <Route exact path="/ProductDetails/:id" element={<ProductDetails/>}/> 
      <Route exact path="/adminDashboard" element={<Dashboard/>}/> 
      <Route exact path="/userProfile" element={<UserProfile/>}/> 
      <Route exact path="/contact" element={<ContactSection/>}/> 
      <Route exact path="/about" element={<AboutSection/>}/>  
      <Route exact path="/adminProductForm" element={<AdminProductForm/>}/> 
      <Route exact path="/categoryData/:category" element={<CategoryWiseData/>}/>  
      <Route exact path="/getOrderDetail/:id/:innerID" element={<OrderDetail/>}/>  
      <Route exact path="/loader" element={<Loader/>}/> 
      <Route exact path="/ratings/:id" element={<Ratings/>}/>
 

 







      
      </Routes>
    </div>
    <Footer/>
    </Router>
  )
}
