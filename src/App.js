import React from 'react'
import Welcome from './Componants/Welcome'
import Navbar from './Componants/Navbar'
import Footer from './Componants/Footer'
import Home from './Componants/Home'
import ProductDetails from './Componants/ProductDetails'
import OrderCompletion from './Componants/OrderCompletion'
import MyCart from './Componants/MyCart'
import MyOrders from './Componants/MyOrders'

export default function App() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Welcome/>  */} 
      {/* <Home/> */}
      {/* <OrderCompletion/> */} 
      <MyOrders/>
      {/* <MyCart/> */}
      {/* <ProductDetails/> */}
      <Footer/>
    </div>
  )
}
