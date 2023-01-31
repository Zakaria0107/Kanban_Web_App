import { createAction , createReducer } from "@reduxjs/toolkit";





const getData = createAction("getData")
const activeBoard = createAction("activeBoard")
const GET_BOARDS_REQURST = createAction("GET_BOARDS_REQURST")
const GET_BOARDS_SUCCESS = createAction("GET_BOARDS_SUCCESS")
const GET_BOARDS_FAILD = createAction("GET_BOARDS_FAILD")

export default createReducer([] , {
    [activeBoard.type] : (state , action) => (
        state.map(elt => elt.data._id == action.payload.id ? {data : elt.data , status : true } : {data : elt.data , status : false })
    ),
    [GET_BOARDS_SUCCESS.type] : (state ,action) => {
        state = []
        action.payload.forEach(( elt , index )=> {
            state.push({data : elt , status : index==0}) 
        })
        return state
    }
})

export {activeBoard , GET_BOARDS_REQURST , GET_BOARDS_SUCCESS , GET_BOARDS_FAILD}