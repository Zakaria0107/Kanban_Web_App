import React, { useState } from 'react'
import store from "../store/UI/StoreConfiguration";
import{ showAddBoard} from "../store/UI/Reducer";
import dataStore from '../store/DATA/StoreConfiguration';
import  {activeBoard }from '../store/DATA/Reducer';

export default function SideBar() {
    const [boards , setBoards] = useState(dataStore.getState())

    dataStore.subscribe(() => setBoards(dataStore.getState()))

    const signOut = () => {
        localStorage.clear()
        window.location.reload()
    }
  return (
    <div className='hidden md:block w-[300px] h-screen bg-[#2B2C37] border-r-[.01em] border-[#3E3F4E]'  >
        <div className='border-b-[.01em] border-[#3E3F4E] h-[100px]'>
        </div>
        <div className=' px-8  py-4 '>
            <h2 className='text-[#828fa3] uppercase text-xs tracking-[3px] font-bold'>All boards ({boards.length})</h2>
            <ul className='my-4 h-[60vh]' >
                {boards.map((elt , index) => 
                    <button key={index} className={elt.status ?'selected_board' : 'board'} onClick={() =>{ dataStore.dispatch(activeBoard({id : elt.data._id})) } }>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className='mr-3 mt-1'><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"></path></svg>
                        {elt.data.name}
                    </button> 
                )}
                <button className=' py-2 mb-2 flex item-center font-bold capitalize text-[#635FC7] hover:opacity-50 duration-300' onClick={() => store.dispatch(showAddBoard())} >
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className='mr-3 mt-1'><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"></path></svg>
                    + create new bord
                </button>
            </ul>
            <button type='button' className='actions_btns text-white bg-[#635fc7] ' onClick={() => signOut()} >Sign Out</button>
        </div>
    </div>
  )
}
