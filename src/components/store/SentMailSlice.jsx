
import { createSlice } from "@reduxjs/toolkit"


const initialSentMailSlice={
    sentTo:'',
    from:'',
    content:'',
    subject:''

}

export const SentMailSlice=createSlice({
    name:'sentMail',
    initialState:initialSentMailSlice,
    reducers:{
        sentMail:(state,action)=>{
            
        }
    }
})
