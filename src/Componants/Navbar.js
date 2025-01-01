import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Function to close the menu after clicking on a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-light bg-light shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        fontFamily: "'Poppins', sans-serif",
        position: "fixed",
        width: "100%",
        zIndex: "1000",
      }}
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        <motion.div
          className="navbar-brand d-flex align-items-center"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://via.placeholder.com/50x50.png?text=G"
            alt="App Logo"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <span className="ms-2 fw-bold text-success">Gurukrupa Kirana</span>
        </motion.div>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">
            {[
              { path: "/about", label: "About" },
              { path: "/myCart", label: "My Cart" },
              { path: "/orderCompletion", label: "Order Completion" },
              { path: "/home", label: "Products" },
              { path: "/myOrders", label: "My Orders" },
              { path: "/contact", label: "Contact" },
              { path: "/adminDashboard", label: "admin" },
              { path: "/adminProductForm", label: "Add Product" },

            ].map((item, index) => (
              <motion.li
                className="nav-item"
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={closeMenu}
              >
                <Link
                  className="nav-link text-dark fw-bold mx-2"
                  to={item.path}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
            <motion.li
              className="nav-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            >
              <Link to="/userProfile">
                <FaUserCircle
                  size={30}
                  className="text-dark mx-2"
                  title="User Profile"
                />
              </Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
