import { createSlice } from "@reduxjs/toolkit"; 
// import ProductDetails from "../ProductDetails";

const initialState={
    productData:[],
    cartData:[],
    ordersData:[]
};

const productSlice= createSlice({

    name:"products",
    initialState,
    reducers:{
        setAllProducts:(state, action)=>{ 
            state.productData=action.payload

        },

         setCartData:(state,action)=>{
            state.cartData=action.payload
         },
         setOrdersData:(state,action)=>{
            state.ordersData= action.payload
         }

    }

})

export const  {setAllProducts, setCartData, setOrdersData} =productSlice.actions; 

export default productSlice.reducer 