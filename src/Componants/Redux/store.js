import { configureStore } from "@reduxjs/toolkit" 
import productReducer from "./jobSlice"



const store=configureStore({ 
    reducer:{
        products:productReducer
        
    }

});
export default store;