import AddBoard from "./components/board/AddBoard"
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container"
import store from "./store/UI/StoreConfiguration";
import { useState } from "react";
import boards from "./store/DATA/StoreConfiguration"
import { GET_BOARDS_REQURST } from "./store/DATA/Reducer";
function App() {
  const [showAddBoard , setShowAddBoard] = useState(false)
  store.subscribe(() => setShowAddBoard(store.getState())) 
  boards.dispatch(GET_BOARDS_REQURST())
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