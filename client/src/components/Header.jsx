import React, { useRef, useState } from 'react'
import DropDown from './DropDown'
import UpdateDelete from './board/UpdateDelete'
import UpdateBoard from './board/UpdateBoard'
import DeleteBoard from './board/DeleteBoard'
import AddTask from './Task/AddTask'
import dataStore from '../store/DATA/StoreConfiguration';

export default function Header() {
    const [boards , setBoards] = useState(dataStore.getState())
    const [editDelete , setEditDelete] = useState(false)
    const [dropDown , setDropDown]  = useState(false)
    const [showAddTask , setShowAddTask]= useState(false)
    const activeBoard =  boards.filter(elt => elt.status == true)
    dataStore.subscribe(() => setBoards(dataStore.getState()))
  
  
    const [updateBoard , setUpdateBoard] = useState(false)
    const [deleteBoard , setDeleteBoard]  = useState(false)

    const btn = useRef()
    const drop_down_btn  = useRef()
  return (
    <div className='w-[100%] h-[100px] bg-[#2B2C37] flex justify-between items-center px-8 border-b-[.01em] border-[#3E3F4E]'>
        <h1 className='hidden md:flex text-white font-bold text-2xl'>{boards.filter(elt => elt.status == true)[0]?.data?.name}</h1> 
        <button type='button' className=' flex md:hidden text-white font-bold text-l' ref={drop_down_btn} onClick={() => setDropDown(true)}>{boards.filter(elt => elt.status == true)[0]?.data?.name} <svg className='ml-4 mt-3' width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"></path></svg></button>
        {activeBoard?.length ?
          <div>
              <button type="button" className='bg-[#635FC7] px-4 py-2 font-bold text-white rounded-full' onClick={() => setShowAddTask(!showAddTask)} >+ <span className='hidden md:inline'>Add new task</span></button>
              <button type='button' className='ml-4 hover:bg-[#20212C] rounder-full p-2 duration-300' ref={btn} onClick={()=> setEditDelete(!editDelete)} >
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg" className='text-[#828fa3] '><g fill="currentColor" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"></circle><circle cx="2.308" cy="10" r="2.308"></circle><circle cx="2.308" cy="17.692" r="2.308"></circle></g></svg>
              </button>
          </div> : ''
        }
        
        {editDelete  ? <UpdateDelete setEditDelete = {setEditDelete} setUpdateBoard={setUpdateBoard} setDeleteBoard={setDeleteBoard} btn={btn} /> : null }
        {showAddTask ? <AddTask setShowAddTask ={setShowAddTask} /> : null}
        {dropDown    ? <DropDown setDropDown = {setDropDown}  btn={drop_down_btn} /> : null }

        {/* Bord */}
        {updateBoard ? <UpdateBoard setUpdateBoard={setUpdateBoard} />  : null}
        {deleteBoard ? <DeleteBoard setDeleteBoard={setDeleteBoard} /> : null}
    </div>
  )
}
