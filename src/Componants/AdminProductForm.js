import React, { useState } from "react";
import { motion } from "framer-motion";
// import "../Styles/AdminForm.css"; // Add your CSS for additional styling
import "../Styles/AdminProductForm.css" 
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";


function AdminProductForm() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    unit: "",
    customUnit: "",
    description: "",
    photo: null,
  });
  const [loading, setLoading]= useState(false) 
  const [error, setError]= useState()

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.info(message);
  const notifyWarning = (message) => toast.warning(message); 




  const units = [
    "kg", "number", "piece", "box", "week", "month", "year",
    "bottle", "litre", "bean", "bundle", "can", "cm", "meter",
    "dozen", "gram", "10gram", "gross",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo:e.target.files[0] });
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,                                           
      unit: value,
      customUnit: value === "other" ? "" : formData.customUnit,
    });
  };








  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true)
    const finalUnit = formData.unit === "other" ? formData.customUnit : formData.unit;
    const payload = { ...formData, unit: finalUnit };

    const formDataToSend = new FormData();

    // Append non-file fields
    Object.keys(payload).forEach((key) => {
        if (key !== "photo") { // Skip photo here
            formDataToSend.append(key, payload[key]);
        }
    }); 

    // Append the photo file only once             
    
    
    if (formData.photo) {
        formDataToSend.append("photo", formData.photo); // Ensure the key matches the backend
    } else {
        console.error("No photo selected");
        return;
    }

    // Debug FormData contents
    console.log('FormData Contents:');
    formDataToSend.forEach((value, key) => {
        console.log(`${key}:`, value instanceof File ? "Binary file data" : value);
    });

    try {
        // const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/admin/addProductData",
         const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/admin/addProductData",
         {
            method: "POST",
            // headers:{"Content-type":"application/json"},  
            body: formDataToSend
            // formDataToSend 
            // Do not set Content-Type explicitly  
        });
                 
        if (!response.ok) {
            const errorText = await response.text();
            // alert("there is some problem while uploading data")
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        notifySuccess(data.message)
        
    } catch (err) {
        notifyError(err.message)
    }finally{
      setLoading(false)
    }
};


  



  
//  const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Prepare the final unit based on the form data
//     const finalUnit = formData.unit === "other" ? formData.customUnit : formData.unit;
    
//     // Create a new FormData object
//     const formDataPayload = new FormData();

//     // Append form data to FormData object
//     formDataPayload.append('productName', formData.productName);
//     formDataPayload.append('category', formData.category);
//     formDataPayload.append('price', formData.price);
//     formDataPayload.append('stock', formData.stock);
//     formDataPayload.append('unit', finalUnit);
//     formDataPayload.append('description', formData.description);
    
//     // Append the file (image) to FormData
//     if (formData.photo) {
//         formDataPayload.append('photo', formData.photo);
//     }

//     try {
//         const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/admin/addProductData", {
//             method: "POST",
//             body: formDataPayload,  // Send FormData object as the body
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//         }

//         const data = await response.json();
//         console.log(data);

//     } catch (err) {
//         console.error("Error:", err);
//     }

//     console.log("Product Data Submitted:", { ...formData, unit: finalUnit });
// };





//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalUnit = formData.unit === "other" ? formData.customUnit : formData.unit;  
//     const payload={...formData,unit:finalUnit} 
//     console.log("form working")

//       console.log(payload)

//     try{
//        const response=  await fetch("https://gurukrupa-kirana-backend.onrender.com/api/admin/addProductData",{  
//             method:"POST",
//             headers:{"Content-type":"application/json"},
//             body:JSON.stringify(payload)
//         })
//         if(!response.ok){
//             const errorText=await response.text()
//             throw new Error(`Request failed with status ${response.status}: ${errorText}`)
//         }
// const data = await response.json()
// console.log(data)
        
//     }catch(err){
//         console.error(err)

//     }



//     console.log("Product Data Submitted:", { ...formData, unit: finalUnit });
//   };

  return ( 
    <>
    <ToastContainer/>
     {loading ? (
              <div className="text-center"><Loader/></div>
            ) : error ? (
              <div className="text-danger text-center">{error}</div>
            ) :
    <div style={{paddingTop:"100px"}}>
    <motion.div
      className="admin-product-form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "20px",
        background: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <motion.h2
        className="text-center mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "'Poppins', sans-serif", color: "#343a40" }}
      >
        Add Product Information
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="admin-product-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Product Name */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter product name"
            required
          />
        </motion.div>

        {/* Category */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter category"
            required
          />
        </motion.div>

        {/* Price */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter price"
            required
          />
        </motion.div>

        {/* Stock */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="stock" className="form-label">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter stock quantity"
            required
          />
        </motion.div>

        {/* Unit */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="unit" className="form-label">
            Unit
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleUnitChange}
            className="form-control"
            required
          >
            <option value="">Select a unit</option>
            {units.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </motion.div>

        {/* Custom Unit */}
        {formData.unit === "other" && (
          <motion.div
            className="form-group mb-3"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            <label htmlFor="customUnit" className="form-label">
              Custom Unit
            </label>
            <input
              type="text"
              id="customUnit"
              name="customUnit"
              value={formData.customUnit}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter custom unit"
              required
            />
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter product description"
            rows="3"
            required
          />
        </motion.div>

        {/* Upload Photo */}
        <motion.div
          className="form-group mb-3"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <label htmlFor="photo" className="form-label">
            Upload Product Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div className="text-center">
          <motion.button
            type="submit"
            className="btn btn-success px-4 py-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Add Product
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
    </div>
}
    </>
  );
}

export default AdminProductForm;
