import reducer from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";
import getData from './middleware'
const board = configureStore({reducer , middleware: [getData]})
export default board