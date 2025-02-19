import React from 'react'
import loader from "../Assets/loader1.gif"

export default function Loader() {
  return (
    <div>
        <img src={loader} alt="loading"/>
        <h6>कृपया प्रतीक्षा करा...!</h6>
      
    </div>
  )
}
