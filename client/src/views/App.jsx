import AddBoard from "../components/board/AddBoard"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Container from "../components/Container"
import store from "../store/UI/StoreConfiguration";
import { useEffect, useState } from "react";
import boards from "../store/DATA/StoreConfiguration"
import { GET_BOARDS_REQURST } from "../store/DATA/Reducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function App() {
  const [showAddBoard , setShowAddBoard] = useState(false)
  const nav = useNavigate()
  store.subscribe(() => setShowAddBoard(store.getState())) 

  // useEffect(() => {
  //   if(!localStorage.getItem('token')){
  //     nav('/login')
  //   }else {
  //     const id = localStorage.getItem('id')
  //     const get_token = localStorage.getItem("token")

  //     axios.get(`${process.env.REACT_APP_API_URL}/user/${id}` ,
  //       { headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${get_token}`
  //       }}
  //     ).then(res => boards.dispatch(GET_BOARDS_REQURST()))
  //     .catch((err) => {
  //       localStorage.clear()
  //       nav('/login')
  //     })
      
  //   }
  // })
    
  return (
    <div className="App md:flex">
      <Sidebar/>
      <div className="w-[100%] md:w-[calc(100vw-300px)]">
        <Header/>
        <Container/>
      </div>
      {showAddBoard ? <AddBoard /> : null}
    </div>
  );
}

export default App;