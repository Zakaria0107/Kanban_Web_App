import React, { useState , useEffect , useRef } from 'react'
import dataStore from "../../store/DATA/StoreConfiguration"
import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';

import axios from 'axios';
import Swal from 'sweetalert2'

export default function AddTask(props) {
    const [subtasks , setSubtasks] = useState([""])
    const [title , setTitle] = useState("")
    const [descreption , setDescreption] = useState("")
    const [column , setColumn] = useState("")
    const box = useRef()
    const activeBoard = dataStore.getState().filter(elt => elt.status == true )[0]?.data

    const removeColumn = (i) => {
        setSubtasks(subtasks.filter((elt, index) => index !== i ))
    }
    useEffect(()=> {
        let handelEvent = (e) => {
            if(!box.current.contains(e.target)){
                props.setShowAddTask(false)
            }
        }
        document.addEventListener('mousedown', handelEvent)
        return()=> document.removeEventListener('mousedown', handelEvent)
    })
    
    const addTask = () => {
        let sub = []
        let columnId = column != "" ? column : activeBoard.columns[0]._id
        subtasks.forEach(elt => sub.push({name : elt , done : false}))
    
        axios.post(`http://localhost:3001/api/task/${activeBoard._id}/${columnId}`, {
            title : title , 
            descreption: descreption, 
            subTasks : sub
        } )
        .then(res => {
            if(res.status == 200) {
                Swal.fire(
                    'Added with success',
                    '',
                    'success'
                )
                props.setShowAddTask(false)
                dataStore.dispatch(GET_BOARDS_REQURST())
            }
        }).catch(err => {
            console.log(err.message)
        })
    }
   return (
    <div className='layer'>
        <div className='box' ref={box}>
            <div className='flex justify-between items-center'>
                <h3 className='text-white font-bold text-xl'>Add New Task</h3>
                <button type="button" onClick={() =>  props.setShowAddTask(false)}><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
            </div>
            <div className='mt-4'> 
                <label className='label'>Title</label>
                <input type="text" className='field' onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className='mt-4'>
                <label className='label'>Desceprion</label>
                <textarea name="" id="" cols="30" rows="5" className='field' onChange={(event) => setDescreption(event.target.value)}></textarea>
            </div>
            <div className='mt-4'> 
                <label className='label'>Subtasks</label>
                {subtasks.map((elt , index) => 
                    (<div className='flex justify-between items-center' key={index}>
                        <input type="text" className='field mb-2 w-[90%]'  onChange={(event) => subtasks[index]=event.target.value} />
                        <button type="button" onClick={() => removeColumn(index)}  ><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
                    </div>))}
            </div>
            <button type='button' className='actions_btns text-[#635fc7] bg-white' onClick={() => setSubtasks([...subtasks , ""])}>+ Add New Subtasks</button>
            <div className='my-4'> 
                <label className='label'>Status</label>
                <select className='field' onChange={(event) => setColumn(event.target.value)}>
                    { activeBoard.columns.map(elt => <option key={elt._id} value={elt._id} className='text-black'>{elt.name}</option> )}
                </select>
            </div>
            <button type='button' className=' actions_btns text-white bg-[#635fc7]' onClick={() => addTask()}>Create Task</button>
        </div>
    </div>
  )
}
