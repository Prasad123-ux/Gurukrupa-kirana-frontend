import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Navbar from "./Navbar";
import "../Styles/Home.css"

// Dummy Data
const categories = ["🍎", "🥦", "🥛", "🍿", "🥤", "🍞", "🍖", "🍪"];
const products = [
  { id: 1, name: "Fresh Apples", price: "$5.99", category: "Fruits", image: "https://via.placeholder.com/80/FF0000/FFFFFF?text=Apple" },
  { id: 2, name: "Organic Milk", price: "$3.49", category: "Dairy", image: "https://via.placeholder.com/80/00FF00/FFFFFF?text=Milk" },
  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },
  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },
  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },

  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },
  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },

  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },

  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },

  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },

  { id: 3, name: "Whole Wheat Bread", price: "$2.99", category: "Bakery", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=Bread" },




];

// Animations
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
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh",}} className="home"> 
    {/* <Navbar/> */}
      {/* Small Navbar for Categories */}
      <div
        style={{
          height: "60px",
          backgroundColor: "#fff",
          display: "flex",
          position:"fixed",
          zIndex:"1000",
          top:"75px",
          width:"100%",
          padding:"10px",
          alignItems: "center",
          overflowX: "auto",
          whiteSpace: "nowrap",
          // padding: "0 10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {categories.map((icon, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.3 }}
            className="d-inline-block mx-3"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "20px" }}>{icon}</span>
          </motion.div>
        ))}
      </div>

      {/* Carousel Section */}
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          marginTop:"100px"
        }}
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
                src="https://via.placeholder.com/800x300/FF5733/FFFFFF?text=Welcome+to+Grocery+Store"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://via.placeholder.com/800x300/33FF57/FFFFFF?text=Fresh+Groceries+Everyday"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Cards Section */}
      <motion.div className="container mt-4">
        <h5 className="fw-bold text-center mb-4">Explore Our Products</h5>
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
                  src={product.image}
                  className="card-img-top mx-auto"
                  style={{ maxWidth: "80px", maxHeight: "80px" }}
                  alt={product.name}
                />
                <div className="card-body">
                  <h6 className="fw-bold text-truncate">{product.name}</h6>
                  <p className="text-muted mb-1">{product.category}</p>
                  <p className="text-success fw-bold">{product.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
