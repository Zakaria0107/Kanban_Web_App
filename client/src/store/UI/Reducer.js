import { createAction , createReducer } from "@reduxjs/toolkit";

const showAddBoard = createAction("showAddBoard")
const hideAddBoard = createAction("hideAddBoard")

export {showAddBoard , hideAddBoard}

export default createReducer(false , {
    [showAddBoard.type] : (state ) => (
        state = true
    ),
    [hideAddBoard.type] : (state) => (
        state = false
    )

})