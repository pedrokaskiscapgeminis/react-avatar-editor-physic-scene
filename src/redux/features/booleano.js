import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    boolean : false
}

let boolT = createSlice({
    name:'bool',
    initialState: initialState,
    reducers :{
        boolTrue: function (state,action){
            state.boolean = true
        },
        boolFalse: function (state,action){
            state.boolean = false
        }
    }
})
export const {boolTrue,boolFalse} = boolT.actions
export default boolT.reducer