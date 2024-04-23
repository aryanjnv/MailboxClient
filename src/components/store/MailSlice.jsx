import { createSlice } from "@reduxjs/toolkit"


const initialState={
    items:[],
    sentItems:[],
    count:0
}

export const mailSlice=createSlice({
    name:'mails',
    initialState,
    reducers:{
        viewMail:(state,action)=>{
          
            state.items=[...action.payload]
        },
        sentMail:(state,action)=>{
           state.sentItems=[...action.payload]
        },
        increaseCount: (state, action) => {
            state.count = action.payload;
          },
        deleteItem:(state,action)=>{
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        deleteSentItem:(state,action)=>{
            const id=action.payload;
            state.sentItems = state.sentItems.filter((item) => item.id !== id);

        }
    }
})

export const {viewMail,increaseCount,deleteItem,sentMail,deleteSentItem}=mailSlice.actions
export default mailSlice.reducer