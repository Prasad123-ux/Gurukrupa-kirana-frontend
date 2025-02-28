import React, { useState, useEffect } from "react";
import { useParams, } from "react-router-dom";
// import "../../Styles/ReportJob.css"; 
import "../Styles/Rating.css" 
import { ToastContainer, toast } from 'react-toastify'; 




export default function Ratings () {
  
  const [jobId, setJobId] = useState("");
  const [details, setDetails] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const {id}= useParams() 
  const token= localStorage.getItem("TOKEN") 
   const notifySuccess = (message) => toast.success(message);
      const notifyError = (message) => toast.error(message);

  useEffect(() => {
    window.scrollTo(0,0)
    
    if (id) {
      setJobId(id); // Automatically populate the job ID if provided
    }
  }, [id]);

  const handleSubmit = async (e) => {  
    e.preventDefault();
    if(!token || token===undefined ) {
      notifyError("Please login Your self ") 
      return
    }

    
    if (!jobId || !details.trim()) {
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://gurukrupa-kirana-backend.onrender.com/api/reportProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, details }),
      });

      if (response.ok) {
        setStatusMessage("Your report has been successfully submitted.");
        setJobId("");
        setDetails("");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit the report.");
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
    <div className="container  report-main  rounded shadow-lg bg-light report-job-container ">
      <h2 className="text-center text-primary mb-4">समस्या नोंदवा</h2>
      <p className="text-muted mb-4">
      कृपया खालील फॉर्म भरून आम्हाला कळवा. तपशीलवार माहिती दिल्यास आम्ही योग्य ती कारवाई करू शकतो. ✅
      </p>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="jobId" className="form-label">
          उत्पादनांची नाव:<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="jobId"
            className="form-control"
            placeholder="किराणा उत्पादनांची नावे"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">
          तपशील: <span className="text-danger">*</span>
          </label>
          <textarea
            id="details"
            className="form-control"
            placeholder="कृपया समस्येबद्दल सविस्तर माहिती द्या"
            rows="5"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
        अहवाल सबमिट करा
        </button>
        {statusMessage && (
          <div
            className={`alert mt-4 ${
              statusMessage.startsWith("Error") ? "alert-danger" : "alert-success"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </form>
      <div className="helpful-tips mt-5 p-3 bg-secondary text-light rounded">
        <h5 className="mb-3">Helpful Tips</h5>
        <ul>
          <li>
            <strong>✅ रेटिंग कशी द्यावी?</strong>   <br></br> <div>उत्पादनाचा गुणवत्ता, चव, ताजेपणा आणि पॅकिंग यानुसार रेटिंग द्या. </div>
          </li>
          <li>
            <strong> ✅ प्रामाणिक पुनरावलोकने द्या...!</strong>   <br></br>
            <span>फक्त खरेदी केलेल्या उत्पादनांबाबतच पुनरावलोकने द्या, जेणेकरून इतर ग्राहकांना मदत होईल.</span> 
          </li>
          <li>
            <strong>✅ फोटो जोडा (पर्यायी)...!</strong>  <br></br>
            <span>तुम्ही उत्पादनाचे फोटो शेअर करू शकता, जेणेकरून इतरांना वस्तूची खरी स्थिती समजू शकेल.</span>
          
          </li>
          <li>
            <strong>✅ अपमानास्पद किंवा दिशाभूल करणाऱ्या टिपण्ण्या टाळा...!</strong> <br></br>
            <span> फक्त उपयुक्त आणि खरी माहिती लिहा.</span>
          </li>
          <li>
            <strong>✅ प्रतिक्रिया उपयोगी ठरल्यास 'लाइक' करा...!</strong>    <br></br>
            <span> इतर ग्राहकांसाठी उपयुक्त पुनरावलोकनांना लाईक करा, जेणेकरून सर्वोत्तम पुनरावलोकने वर दिसतील.</span>
          </li>
        </ul>
      </div>
      













    </div>
  
    </>
  );
};

;
