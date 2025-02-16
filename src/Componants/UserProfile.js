import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/UserProfile.css"; 
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";


const UserProfile = () => { 

  const [loading, setLoading]= useState(true) 
  const [error, setError]= useState()
  const navigate=useNavigate()
  const [profile, setProfile] = useState({

    name: "",
    mobile: "",
    address: "Not Mentioned",
    profileImage: "",
  });

  const notifySuccess = () => toast.success('This is a success message!');
    const notifyError = (message) => toast.error(message);
   


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profileImage: file }); // Store the file object temporarily
    }
  };
  const token = localStorage.getItem("TOKEN"); 





  useEffect(() => {
    window.scrollTo(0,0)
    const getUserData = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/user/getUserData", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json(); 
        console.log(data)
        
          setProfile({
            name: data.data.name,
            mobile: data.data.mobile_number,
            address: data.data.address,
            profileImage: data.data.profileImage,
          });
      } catch (err) {
        // console.error("Error fetching user data:", err); 
        notifyError(err.message)
        setError("Internal Server Error")

      }finally{
        setLoading(false)
        
      }
    };
    getUserData();
  }, [token]);



  


  const handleProfileImageUpload = async (e) => {
    e.preventDefault()
    

    const formData = new FormData(); 
    
    formData.append("profileImage", profile.profileImage);
    formData.append("mobileNumber", profile.mobile);

    formData.append("name", profile.name);

    formData.append("address",profile.address );  



    console.log(formData)


    try {
      const response = await fetch("http://localhost:7000/api/user/updateProfileData", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Image upload failed with status ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      setProfile({ ...profile, profileImage: result.profileImage });
      notifySuccess("User Data updated Successfully")
    } catch (error) {
      notifyError("Failed to upload profile Data. Please try again.")
      //  setError(error.message)
    
    }finally{
      setLoading(false)
    }
  };




  console.log(profile)


  const onchange=(e)=>{
    setProfile({...profile, [e.target.name]:e.target.value}) 

    
  } 

  const handleDashboard=()=>{
    navigate("/adminDashboard")

  }
  const handleProductAdd=()=>{
    navigate("/adminProductForm")
  }
 
  return (
    <div className="user-profile-section"> 
    <ToastContainer/>

<div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form onSubmit={handleProfileImageUpload}>
        <div class="mb-3">
            <label htmlFor="file" class="col-form-label">Choose File:</label>
            <input type="file" class="form-control" name="profileImage"    accept="image/*"   onChange={handleFileChange}id="profileImage"/>
          </div>
          <div class="mb-3">
            <label htmlFor="name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" name="name" value={profile.name} onChange={onchange} id="name"/>
          </div>
          <div class="mb-3">
            <label htmlFor="mobile" class="col-form-label">Mobile Number:</label>
            <input class="form-control" type="number" id="mobile" name="mobile" value={profile.mobile}  onChange={onchange}></input>
          </div>
          <div class="mb-3">
            <label htmlFor="address" class="col-form-label">Address:</label>
            <input class="form-control" type="address" id="message-text" name="address" value={profile.address}  onChange={onchange}></input>
          </div>
       
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Send message</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div> 

{ loading ? (
          <div className="text-center"><Loader/></div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ):
      <div className="container">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <motion.img
              src={profile.profileImage}
              alt="Profile"
              className="profile-image"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.4 }}
              
            />
            <input
              type="file"
              id="profileImageUpload"
              style={{ display: "none" }}
              accept="image/*" 
              
              // onChange={handleProfileImageUpload} 


            />
        

          </div>
          <button type="button" className="btn btn-outline-primary " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit Detail</button>


          <div className="profile-details mt-4">
            <ProfileField
              label="Name"
              value={profile.name}
              icon={<FaUserEdit />}
              // onEdit={() => handleEdit("name")} 
              
            />
            <ProfileField
              label="Mobile Number"
              value={profile.mobile}
              icon={<FaUserEdit />}
              // onEdit={() => handleEdit("mobile")}
            />
            <ProfileField
              label="Address"
              value={!profile.address? "Not Mentioned": profile.address }
              icon={<FaMapMarkerAlt />}
              // onEdit={() => handleEdit("address")}
            />
          {  profile.mobile_number===9307173845 || 9359334431 || 8530825101 ?   
            <div
              label="Dashboard"
            onClick={handleDashboard}
              
              // onEdit={() => handleEdit("mobile")}
            > Dashboard</div>:""
          }
          
           {  profile.mobile_number===9307173845 || 9359334431 || 8530825101 ?   
            <div
              label="Add Product"
            onClick={handleProductAdd}
              
              // onEdit={() => handleEdit("mobile")}
            > Add Product</div>:""
          }

          </div>
        </motion.div>
        <div>

</div>
      </div> 

      } 

     
    </div>
  );
};




const ProfileField = ({ label, value, icon, onEdit }) => (
  <motion.div
    className="profile-field"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <div>
      <h6 className="text-muted mb-1">{label}</h6>
      <p className="fw-bold">{value}</p>
    </div>
    
   
   


  
  </motion.div>
);

export default UserProfile;
