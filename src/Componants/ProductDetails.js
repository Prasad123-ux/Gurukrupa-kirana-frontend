import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useParams } from "react-router-dom"; 
import "../Styles/ProductDetail.css"; 
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify'; 
import { FaRupeeSign } from "react-icons/fa";  
import { FiShare2 } from "react-icons/fi"; 
import { GrLike } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import { IoCopy } from "react-icons/io5"; 
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";




function ProductDetails() {
  const [quantity, setQuantity] = useState(1);  
  const [product, setProduct] = useState(null); // Initial state as null for better checks 
  const [total,setTotal]= useState()
  const { id } = useParams(); // Correct usage of useParams 
  const navigate= useNavigate() 
  const token= localStorage.getItem("TOKEN") 
  const [loading, setLoading]= useState(true) 
  const [error, setError]= useState(null)
  const [cartLoading, setCartLoading]= useState(false) 
  const [like,setLike]= useState(false) 
  const [showValue,setShowValue]= useState(false)
  



    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);


    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productPrice: "",
        productStockQuantity: "",     
        productUnit: "",  
        productCustomUnit: "",           
        productDescription: "",
        photo: null,
      });

      const units = [
        "kg", "number", "piece", "box", "week", "month", "year",
        "bottle", "litre", "bean", "bundle", "can", "cm", "meter",
        "dozen", "gram", "10gram", "gross",
      ];








useEffect(() => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token); // Decode the JWT token
  
    let mobile_number = decoded.mobile_number;

    // Corrected condition
    console.log(typeof(mobile_number))
    mobile_number=Number(mobile_number)
    console.log(typeof(mobile_number))
    const allowedNumbers = [9307173845, 8530825101, 9359334431];

    if (allowedNumbers.includes(mobile_number)){ 
      console.log("number find")
      setShowValue(true);
    } else {
      setShowValue(false);
      console.log("number not find")
    }
  } catch (error) {
    console.error("Invalid token", error);
    setShowValue(false);
  }
}, [token]);


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
          productUnit: value,
          productCustomUnit: value === "other" ? "" : formData.productCustomUnit,
        });
      };
    
    

  const getProductDetail = async () => { 
    try {
      const response = await fetch(`https://gurukrupa-kirana-backend.onrender.com/api/user/getProductDetail/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        notifyError("We could not find product Please find another product")
        setError(errorText)
        //  throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setProduct(data.data); 
      console.log(product._id)
      // notifySuccess(data.message)
    } catch (err) {
      //  notifyError("Internal Server Error")
      // console.error(err);
    }
    finally{
      setLoading(false)
    }
  };  


  useEffect(() => { 
    window.scrollTo(0,0)

    if (id) {
      getProductDetail(); 
      console.log(product)
    }
  }, [id]); // Ensure id is a dependency 


  

  const calculatePrice = (price) => {
    if (!product) return "0.00"; // Handle case where product is not yet available
    let finalPrice = price * quantity;
    const offer = product.offers.find((o) => quantity >= o.quantity);
    if (offer) {
      finalPrice -= (finalPrice * parseInt(offer.discount)) / 100;
    }
    return finalPrice.toFixed(2);
  };
 



  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!id) {
        notifyError("Product ID is missing!");
        setLoading(false);
        return;
    }

    const finalUnit = formData.productUnit === "other" ? formData.productCustomUnit : formData.productUnit;
    const payload = { ...formData, productUnit: finalUnit };

    const formDataToSend = new FormData();

    // Append non-file fields
    Object.keys(payload).forEach((key) => {
        if (key !== "photo") {
            formDataToSend.append(key, payload[key]);
        }
    });

    // Append the photo file only if it exists
    if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
    }

    // Debugging FormData
    console.log("FormData Contents:");
    formDataToSend.forEach((value, key) => {
        console.log(`${key}:`, value instanceof File ? "Binary file data" : value);
    });

    try {
        const response = await fetch(`https://gurukrupa-kirana-backend.onrender.com/api/admin/updateProduct/${id}`, {
            method: "PATCH",
            body: formDataToSend, // Do NOT set Content-Type explicitly
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        notifySuccess(data.message);
    } catch (err) {
        notifyError(err.message);
    } finally {
        setLoading(false); // Ensures loading is stopped even if there's an error
    }
};


 
const addToCart=async()=>{ 
  setCartLoading(true)

  try{
  
  const response= await fetch("https://gurukrupa-kirana-backend.onrender.com/api/user/addToCart", { 

    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({id:id, quantity:quantity ,price: product && product.productPrice >=0 ?product.productPrice:"",category: product && product.productCategory.length >=0 ?product.productCategory:"",token:token, name: product && product.productName.length >=0 ?product.productName:"" ,unit: product && product.productUnit.length >=0 ?product.productUnit:"",image: product && product.productLink.length >=0 ?product.productLink:""})
  })
  if(!response.ok){
    
  
    const errorText = await response.text();
  
throw new Error(`Request failed with status ${response.status}: ${errorText}`); 

    

  }else{
    const data = await response.json()
    notifySuccess(data.message)
    navigate("/myCart")
}
}catch(err){
  notifyError(err.message)

  


}finally{
  setCartLoading(false)

}

}
  
const handleLike=()=>{ 
  if(like===true){
    setLike(false)
    
  }
  else{
    setLike(true)
    handleReportJob()
    notifySuccess("आपल्या पाठबळाबद्दल धन्यवाद!")
  }

 

}
const handleShare=(productName)=>{


  const productURL = window.location.href; // Get current page URL
  const encodedURL = encodeURIComponent(productURL); // Ensure proper encoding
  const message = `नमस्कार! गुरुकृपा किराणा मध्ये आपले स्वागत आहे ! मी तुम्हाला हे उत्पादन शेअर करत आहे.: ${productName}  M.R.P:${product.productPrice}  \n\nअधिक माहितीसाठी येथे क्लिक करा 👇\n${productURL}`;
  
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappURL, "_blank");
}




const handleReportJob=(id)=>{
  navigate(`/ratings/${product.productName}`)
}

const handleCopy=(id)=>{ 
  
  navigator.clipboard.writeText(id)
      .then(() => notifySuccess("Copied to clipboard!"))
      .catch((err) => notifyError("Failed to copy:", err));

}
  
const handleDeleteProduct=async()=>{  
  setLoading(true)
  try{
    const response= await fetch(`https://gurukrupa-kirana-backend.onrender.com/api/admin/deleteProduct/${id}`, {
      method:"DELETE"
    })
    if(!response.ok){
      const errorText = await response.text();
     throw new Error(`Request failed with status ${response.status}: ${errorText}`); 
    }else{ 
      notifySuccess("Product Deleted")   

    }
  }catch(err){ 
    notifyError(err.message)

  }finally{
    setLoading(false)
  }

}



const handleCategoryData=(category)=>{  
  if (!token){
    window.scrollTo(0,0)
    notifyError("Please Login Yourself")
    return 
    
  }else{
    navigate(`/categoryData/${category}`)
    window.scrollTo(0,0)

   
  }
 

}

  return (
    <>{  loading ? (
              <div className="text-center " style={{paddingTop:"200px"}}><Loader/></div>
            ) : error ? (
              <div className="text-danger text-center">{error}</div>
            ) : <div 
    
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px 0",
      }} 
      // className="product"
    >
      {/* Product Section */}
      <motion.div

        className="container product d-flex justify-content-around "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {  product && product.productName.length >= 0   ? 
        <div className="row align-items-center">
          <motion.div

            className="col-md-6 text-center "
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              //  alt={product.name}
               src={ product && product.productLink.length >= 0  ? product.productLink[0]:" "}              alt="nothing"
              //  alt={product.name}
              style={{
                maxWidth: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
            { showValue ?
            <div className="mt-5">
            <button className=" btn btn-primary " onClick={handleDeleteProduct}>Delete</button>
            <button className="btn btn-primary" type="button"  data-bs-dismiss="modal" data-bs-toggle="modal"  aria-label="Close" data-bs-target="#exampleModal" data-bs-whatever="@mdo ">Update</button>
            </div>:""
}
            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div >
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
                onSubmit={handleUpdateProduct}
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
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter category" 
                    style={{cursor:"pointer"}}
                
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
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter price"
                  
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
                    name="productStockQuantity"
                    value={formData.productStockQuantity}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter stock quantity"
                  
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
                    name="productUnit"
                    value={formData.productUnit}
                    onChange={handleUnitChange}
                    className="form-control"
                  
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
                      name="productCustomUnit"
                      value={formData.productCustomUnit}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter custom unit"
                    
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
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter product description"
                    rows="3"
                
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
                    data-bs-dismiss="modal"
                  >
                    Update Product
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
            </div>
      
      </div>
    </div>
  </div>
</div> 
          </motion.div>
          <motion.div
            className="col-md-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }} 
          >
            <h3 className="fw-bold mt-5 d-flex justify-content-between"><span>{ product && product.productName.length >= 0  ? product.productName:" "} </span><div className="d-flex justify-content-around  "> <motion.div 
        className=" me-5"
        style={{ borderRadius: "px", width:"fitContent" }}
        onClick={()=>{handleShare(product.productName, )}}> <FiShare2 style={{cursor:"pointer"}} /></motion.div> { like ? <span onClick={handleLike} style={{cursor:"pointer"}}><FcLike /></span>: <span onClick={handleLike}><GrLike /></span> }</div> </h3>  
            <p className="text-muted mb-1 mt-2 fw-bold" style={{cursor:"pointer"}} onClick={()=>{handleCategoryData(product.productCategory)}}>प्रकार: {product&& product.productCategory.length >= 0  ? product.productCategory:" "}</p>
            <p className="text-muted mt-4"> <span className="fw-bolder" > माहिती</span> : {product && product.productDescription.length >= 0  ? product.productDescription:" "}</p>
            <p className="text-success fs-5 fw-bold">Price: <FaRupeeSign/> { product && product.productPrice>=0  ? product.productPrice:" N/A"} per {product && product.productUnit ? product.productUnit :"" }</p>
            <p className="text-success ">M.R.P: <del>&#8377; { product && product.productPrice>=0  ? product.productPrice%5+product.productPrice :" N/A"}.00</del>  (Incl. of all taxes)</p>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center my-3">
              <label htmlFor="quantity" className="me-2 fw-bold">
              प्रमाण :
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1" 
                max="50"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="form-control"
                style={{ width: "80px" }}
              />
            </div>
           
            {/* Total Price */}
            <p className="text-primary fw-bold">एकूण: {product && product.productPrice>=0  ? product.productPrice*quantity:" N/A"} <FaRupeeSign/> </p>  

            {/* Order Button */}

            {product ? (
  product.productStockQuantity >= 1 ? (
    cartLoading ? (
      <div className="text-center " style={{alignItems:'center'}}><Loader/></div>
      // Display the loader if loading is true
    ) : (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary px-4 py-2"
        style={{ borderRadius: "20px" }}
        onClick={addToCart}
      >
       कार्टमध्ये जोडा
      </motion.button> 
      
    )
  ) : (
    <span>आयटम उपलब्ध नाही</span> // Inform user that the item is unavailable
  )
) : (
  <Loader /> // Handle case when product is null or undefined
)}
<div className="d-flex justify-content-center flex-row">
<p className="mt-5"> लेख ID:{product && product._id>=0   ? product._id:""}{id}</p>
<p className="mt-5 ms-5" ><IoCopy onClick={()=>{handleCopy(id)}}  style={{width:"fitContent", height:"fitContent" ,cursor: "pointer", color: "#4CAF50", fontSize: "18px" }}/></p>
</div>

          </motion.div>
        </div> 
  :<div className="text-center">अरेरे...! पुन्हा प्रयत्न करा. आमच्याकडे उत्पादनाची माहिती उपलब्ध नाही.
  
   </div>  }
      </motion.div>

    

      {/* About Section */}
      <motion.div
        className="container mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h4 className="fw-bold text-center mb-4">आमच्या दुकानाबद्दल </h4>
        <p className="text-muted text-center">
        आमच्या किराणा दुकानात तुमचे स्वागत आहे! आम्ही तुमच्या दैनंदिन गरजांसाठी उच्च दर्जाची आणि सर्वोत्तम उत्पादने प्रदान करतो. आमचे उद्दिष्ट उत्कृष्ट सेवा देणे आणि प्रत्येक ग्राहकाचे समाधान सुनिश्चित करणे आहे. आम्हाला निवडल्याबद्दल धन्यवाद!
        </p>
      </motion.div>
      <ToastContainer autoClose={4000}/>
    </div>
}</>

  );
}

export default ProductDetails;
