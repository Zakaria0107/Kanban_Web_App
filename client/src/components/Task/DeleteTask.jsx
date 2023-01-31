import axios from 'axios'
import React  ,{useRef , useEffect} from 'react'
import dataStore from "../../store/DATA/StoreConfiguration"
import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';
import Swal from 'sweetalert2'

export default function DeleteTask(props) {
    const box = useRef()

    useEffect(()=> {
      let handelEvent = (e) => {
            if(!box.current.contains(e.target) ){
              props.setDeleteTask(false)
            }
          }
      document.addEventListener('mousedown', handelEvent)
      return()=> document.removeEventListener('mousedown', handelEvent)
    })

    const deleteTask = () => {
      axios.delete(`http://localhost:3001/api/task/${props.task.boardId}/${props.task.columnId}/${props.task._id}`)
      .then(res => {
          if(res.status == 200) {
              Swal.fire(
                  'Deleted with success',
                  '',
                  'success'
              )
              props.setDeleteTask(false)
              dataStore.dispatch(GET_BOARDS_REQURST())
          }
      }).catch(err => {
          console.log(err.message)
      })
    }
  return (
    <div className='layer'>
      {console.log("tedtedttedte " , props.task)}
        <div className='box' ref={box}>
            <h3 className='text-[#ea5555] font-bold text-xl'>Delete this task?</h3>
            <p className='my-4 text-[#828fa3] text-sm font-semibold'>Are you sure you want to delete the '{props.task.title}' task? </p>
            <div className='flex justify-between'>
                <button type="button" className='w-[48%] bg-[#ea5555] px-4 py-2 font-bold text-white text-sm rounded-full hover:opacity-50 duration-300' onClick={() => deleteTask()}>Delete</button>
                <button type="button" className='w-[48%] bg-[#f0effa] px-4 py-2 font-bold text-[#635fc7] text-sm rounded-full hover:opacity-50 duration-300' onClick={() => props.setDeleteTask(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
