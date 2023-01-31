import React ,{useRef , useEffect, useState} from 'react'
import UpdateDelete from './UpdateDelete'

import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';
import dataStore from '../../store/DATA/StoreConfiguration';
import axios from 'axios';
import { activeBoard } from '../../store/DATA/Reducer';

export default function TaskDetails(props) {
    const box = useRef()
    let task = props.task
    const [columnId , setColumnId] = useState(task.columnId)
    const [subTasks , setSubTasks] = useState(task.subTasks)
    const [showUpdateDelete , setShowUpdateDelete] = useState(false)
    const [data , setData] = useState(dataStore.getState().filter(elt => elt.status === true)[0].data)
    const [columns , setColumns] = useState(data.columns)
    
    useEffect(()=> {
      let handelEvent = (e) => {
            if(!box.current.contains(e.target) ){
              props.setTaskDetailsBox(false)
            }
          }
      document.addEventListener('mousedown', handelEvent)
      return()=> document.removeEventListener('mousedown', handelEvent)
    })
    dataStore.subscribe(() => {
      setData(dataStore.getState().filter(elt => elt.status === true)[0].data)
      setColumns(data.columns)
    })
    const updateTask = () => {
      axios.put(`http://localhost:3001/api/task/${data._id}/${props.task.columnId}/${props.task._id}` , 
      {
        title : task.title , 
        descreption : task.descreption, 
        subTasks : subTasks , 
        columnId : columnId , 
        boardId : activeBoard._id
      })
      .then ( res => {
        props.setTaskDetailsBox(false)
        dataStore.dispatch(GET_BOARDS_REQURST())
      })
      .catch(err => console.log(err))

    }
  return (
    <div className='layer'>
        <div className=' relative box' ref={box}>
            {showUpdateDelete ? <UpdateDelete setShowUpdateDelete = {setShowUpdateDelete} setTaskDetailsBox={props.setTaskDetailsBox} setDeleteTask = {props.setDeleteTask} setupdateTask={props.setupdateTask} /> : null}
            <div className='flex justify-between items-start mb-4'>
                <h2 className='font-bold text-white'>{task.title}</h2>
                <button type='button' className='ml-4 hover:bg-[#20212C] rounder-full p-2 duration-300' onClick={() => setShowUpdateDelete(!showUpdateDelete)}>
                    <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg" className='text-[#828fa3] '><g fill="currentColor" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"></circle><circle cx="2.308" cy="10" r="2.308"></circle><circle cx="2.308" cy="17.692" r="2.308"></circle></g></svg>
                </button>
            </div>
            <p className='text-[#828fa3] text-sm font-semibold'>{task.descreption}</p>
            <h4 className='text-white text-xs font-bold mt-4'>subtasks ({task.subTasks.length})</h4>
            {task.subTasks.map((elt , index )=> 
              <div className='bg-[#20212C] flex p-4 rounded-lg mt-2'>
                { elt.done ?<input type="checkbox" checked onChange={() => subTasks[index].done = !subTasks[index].done} /> :
                <input type="checkbox" onChange={() => subTasks[index].done = !subTasks[index].done} /> }
                <p className='text-white text-xs font-semibold ml-4'>{elt.name}</p>
            </div>
            )}
            <h4 className='text-white text-xs font-bold mt-4'>Current State</h4>
            <div className='my-4'> 
                <select className='field'  onChange={(event) => setColumnId(event.target.value)}>
                    {columns.map(elt => (elt._id == task.columnId ?<option value={elt._id} className='text-black' selected >{elt.name}</option> : <option value={elt._id} className='text-black' >{elt.name}</option> ))}
                </select>
            </div>
            <button type='button' className=' actions_btns text-white bg-[#635fc7]' onClick={()=> updateTask()}>Save the changes</button>
        </div>
    </div>
  )
}
