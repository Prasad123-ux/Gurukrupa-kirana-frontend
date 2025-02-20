import React from "react";
import { motion } from "framer-motion";
import "../Styles/AboutSection.css";

const AboutSection = () => {
  const shopImages = [
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834654/product_images/WhatsApp_Image_2025-01-14_at_11.28.42_41a38bdc_cciwn6.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834637/product_images/WhatsApp_Image_2025-01-14_at_11.28.43_876fd846_ko7e3f.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834614/product_images/WhatsApp_Image_2025-01-14_at_11.28.41_b850dacf_qdpdre.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834600/product_images/WhatsApp_Image_2025-01-14_at_11.28.40_3005b582_ito7kf.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834547/product_images/WhatsApp_Image_2025-01-14_at_11.28.37_8ba37289_gpcrpj.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834582/product_images/WhatsApp_Image_2025-01-14_at_11.28.38_dcf307c9_pdtccl.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834532/product_images/WhatsApp_Image_2025-01-14_at_11.28.36_6d0dd468_avfq0u.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1736834514/product_images/WhatsApp_Image_2025-01-14_at_11.28.36_3b440cc5_xyq9r0.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1740020226/WhatsApp_Image_2025-02-20_at_08.22.29_ed7d9319_b1ycxs.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1740020217/WhatsApp_Image_2025-02-20_at_08.22.31_fcbb301c_ydmksx.jpg",
   "https://res.cloudinary.com/det3aoore/image/upload/v1740020557/5gB_sMvwavcDxq60EL-LIobryUCqgtFEe9mvlZPPEFti7Iwv2Gp8GwzjjvkZHb4EpTqmVEcpfZ7oBJO8NWorrpuL3Pkt1U8BxTln7RddVkwheSJpbU1KRGXcvJHLS155FmIcbnYNeUE5uqW_XW9T6Sw_hti55i.webp"
  //  "https://res.cloudinary.com/det3aoore/image/upload/v1736834503/product_images/WhatsApp_Image_2025-01-14_at_11.28.35_5efcd127_uc8s3h.jpg",
  //  "https://res.cloudinary.com/det3aoore/image/upload/v1736834483/product_images/WhatsApp_Image_2025-01-14_at_11.28.35_3399fccf_ij5ssi.jpg"


  ];

  return (
    <div className="about-section">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>आमच्याबद्दल</h2>
        <p>गुरुकृपा किराणा स्टोअर बद्दल अधिक जाणून घ्या</p>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3>आमच्याबद्दल अधिक माहिती</h3>
          <p>
          गुरुकृपा किराणा स्टोअरची स्थापना 2022 मध्ये झाली, आमच्या ग्राहकांना उच्च दर्जाचे किराणा सामान पुरवण्याच्या उद्देशाने. गेल्या काही वर्षांत, आम्ही ताजे, परवडणारे आणि विविध प्रकारचे उत्पादने देऊन समुदायाच्या गरजा पूर्ण करण्यासाठी एक विश्वासार्ह ओळख निर्माण केली आहे. 😊🛒
          </p>
          <h3>आमची वचनबद्धता</h3>
          <p>
          आमच्यासाठी ग्राहकांचे समाधान सर्वात महत्त्वाचे आहे. आमची टीम कार्यक्षमता, वेळेवर वितरण आणि वैयक्तिक खरेदी अनुभव सुनिश्चित करते. आम्ही अचूकतेने साठा व्यवस्थापित करतो, प्रभावीपणे उत्पादने पुरवतो आणि प्रत्येकासाठी स्वागतार्ह वातावरण राखण्यासाठी सतत प्रयत्न करतो. 😊🛒








          </p>
          <h3>आम्हाला का निवडावे?</h3>
          <ul>
            <li>स्पर्धात्मक किमतीत उच्च दर्जाची उत्पादने</li>
            <li>ग्राहक केंद्रित सेवा</li>
            <li>लवचिक वितरण पर्याय</li>
            <li>पारदर्शक व्यावसायिक पद्धती</li>
          </ul>
        </motion.div>

        <motion.div
          className="about-images"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3>आमचे दुकान कार्यरत स्थितीत</h3>
          <div className="image-gallery">
            {shopImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Shop ${index + 1}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="about-extra"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>आम्ही कसे कार्य करतो</h3>
        <p>
        गुरुकृपा किराणा स्टोअरमध्ये, आम्ही अत्याधुनिक साठा व्यवस्थापन प्रणाली वापरून कार्यक्षम कार्यप्रवाह राखतो. आमची टीम प्रत्येक ऑर्डरची वेगवान प्रक्रिया, पॅकिंगपासून वितरणापर्यंत, सुनिश्चित करते. मजबूत लॉजिस्टिक्स नेटवर्कच्या मदतीने, आम्ही वेळेवर आणि अचूक उत्पादन वितरणाची हमी देतो. 🚚🛒
        </p>
        <p>
        आम्ही आमच्या ग्राहकांच्या विश्वासाला मोठे मूल्य देतो आणि त्यांना त्रासमुक्त खरेदीचा अनुभव देण्यास वचनबद्ध आहोत. गुरुकृपा किराणा स्टोअर हे तुमच्या सर्व किराणा गरजांसाठी एकाच ठिकाणी संपूर्ण समाधान देणारे ठिकाण आहे. 😊🛒
        </p>
      </motion.div>
    </div>
  );
};

export default AboutSection;
