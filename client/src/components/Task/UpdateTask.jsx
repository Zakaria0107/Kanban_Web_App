import React, { useState , useEffect , useRef } from 'react'
import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';
import dataStore from '../../store/DATA/StoreConfiguration';
import axios from 'axios';

export default function UpdateTask(props) {

    let task = props.task   
    const [columnId , setColumnId] = useState(props.task.columnId)     
    const [subTasks , setSubTasks] = useState(props.task.subTasks)
    const [title , setTitle] = useState(props.task.title)
    const [descreption , setDescreption] = useState(props.task.descreption)
    const box = useRef()
    
    const [data , setData] = useState(dataStore.getState().filter(elt => elt.status === true)[0].data)
    const [columns , setColumns] = useState(data.columns)
    dataStore.subscribe(() => {
        setData(dataStore.getState().filter(elt => elt.status === true)[0].data)
        setColumns(data.columns)
      })
    const removeColumn = (i) => {
        setSubTasks(subTasks.filter((elt, index) => index !== i ))
    }
    useEffect(()=> {
        let handelEvent = (e) => {
            if(!box.current.contains(e.target)){
                props.setupdateTask(false)
            }
        }
        document.addEventListener('mousedown', handelEvent)
        return()=> document.removeEventListener('mousedown', handelEvent)
    })

    const updateTask = () => {
        const user_id = localStorage.getItem("id")
        const get_token = localStorage.getItem('token')
        axios.put(`${process.env.REACT_APP_API_URL}/task/${user_id}/${data._id}/${props.task.columnId}/${props.task._id}` , 
        {
          title  , 
          descreption , 
          subTasks, 
          columnId , 
          boardId : data._id
        } ,  { headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${get_token}`
            }})
        .then ( res => {
            props.setupdateTask(false)
          dataStore.dispatch(GET_BOARDS_REQURST())
        })
        .catch(err => console.log(err))
  
      }
   return (
    <div className='layer'>
        <div className='box' ref={box}>
            <div className='flex justify-between items-center'>
                <h3 className='text-white font-bold text-xl'>Add New Task</h3>
                <button type="button" onClick={() =>  props.setupdateTask(false)}><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
            </div>
            <div className='mt-4'> 
                <label className='label'>Title</label>
                <input type="text" className='field' value={title} onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className='mt-4'>
                <label className='label'>Desceprion</label>
                <textarea name="" id="" cols="30" rows="5" className='field' value={descreption} onChange={(event) => setDescreption(event.target.value)}></textarea>
            </div>
            <div className='mt-4'> 
                <label className='label'>Subtasks</label>
                {subTasks.map((elt , index) => 
                    (<div className='flex justify-between items-center' key={index}>
                        <input type="text" className='field mb-2 w-[90%]' value={elt.name}  onChange={(e) => {
                            let arr = subTasks
                            arr = arr.map((elt1 , i ) => index == i ?{name:  e.target.value  , done : false }: elt1)
                            setSubTasks(arr)
                            }} 
                        />
                        <button type="button" onClick={() => removeColumn(index)}  ><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
                    </div>))}
            </div>
            <button type='button' className='actions_btns text-[#635fc7] bg-white' onClick={() => setSubTasks([...subTasks ,{name :"" , done : false}])}>+ Add New Subtasks</button>
            <div className='my-4'> 
                <label className='label'>Status</label>
                <select className='field'  onChange={(event) => setColumnId(event.target.value)}>
                    {columns.map(elt => (elt._id == task.columnId ?<option value={elt._id} className='text-black' selected >{elt.name}</option> : <option value={elt._id} className='text-black' >{elt.name}</option> ))}
                </select>
            </div>
            <button type='button' className=' actions_btns text-white bg-[#635fc7]' onClick={() => updateTask()}>Create Task</button>
        </div>
    </div>
  )
}
