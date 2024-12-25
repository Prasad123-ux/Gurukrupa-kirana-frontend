import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
 import "../Styles/UserProfile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    mobile: "9876543210",
    address: "123, Green Street, Mumbai",
    profileImage: "https://via.placeholder.com/150",
  });

  const handleEdit = (field) => {
    const updatedValue = prompt(`Enter your new ${field}:`, profile[field]);
    if (updatedValue) {
      setProfile({ ...profile, [field]: updatedValue });
    }
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profileImage: imageUrl });
    }
  };

  return (
    <div className="user-profile-section">
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
              onClick={() => document.getElementById("profileImageUpload").click()}
            />
            <input
              type="file"
              id="profileImageUpload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
            <motion.button
              className="btn btn-outline-primary mt-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => document.getElementById("profileImageUpload").click()}
            >
              <FaCamera className="me-2" />
              Change Profile Image
            </motion.button>
          </div>

          <div className="profile-details mt-4">
            <ProfileField
              label="Name"
              value={profile.name}
              icon={<FaUserEdit />}
              onEdit={() => handleEdit("name")}
            />
            <ProfileField
              label="Mobile Number"
              value={profile.mobile}
              icon={<FaUserEdit />}
              onEdit={() => handleEdit("mobile")}
            />
            <ProfileField
              label="Address"
              value={profile.address}
              icon={<FaMapMarkerAlt />}
              onEdit={() => handleEdit("address")}
            />
          </div>
        </motion.div>
      </div>
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
    <motion.button
      className="btn btn-outline-secondary btn-sm"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onEdit}
    >
      {icon}
      Edit
    </motion.button>
  </motion.div>
);

export default UserProfile;
