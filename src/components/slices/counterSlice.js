import { createSlice } from "@reduxjs/toolkit";


let counterSlice=createSlice({
    name:"counterSlice",
    initialState:{
        counter:0,
        userName:"Ahmed",
    },
    reducers:{
        increment:(state,action)=>{
            state.counter +=1
            console.log("increment",state.counter);
        },
        decrement:(state,action)=>{
            state.counter -=1
            console.log("decrease",state.counter);
        },
        IByAmount:(state,action)=>{
            state.counter += action.payload
            console.log("IByAmount",state.counter);
        },
        DByAmount:(state,action)=>{
            state.counter -= action.payload
            console.log("DByAmount",state.counter);
        }
    }
})
export const {increment,decrement,IByAmount,DByAmount}=counterSlice.actions;
export default counterSlice.reducer;
