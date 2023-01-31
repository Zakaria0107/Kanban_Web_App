import React  ,{useRef , useEffect} from 'react'

import axios from 'axios';
import Swal from 'sweetalert2'
import dataStore from "../../store/DATA/StoreConfiguration"
import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';

export default function DeleteBoard(props) {
    const box = useRef()
    const activeBoard = dataStore.getState().filter(elt => elt.status == true )[0]
    useEffect(()=> {
      let handelEvent = (e) => {
            if(!box.current.contains(e.target) ){
              props.setDeleteBoard(false)
            }
          }
      document.addEventListener('mousedown', handelEvent)
      return()=> document.removeEventListener('mousedown', handelEvent)
    })

    const deleteBoard = () => {
      if(activeBoard){
        axios.delete(`http://localhost:3001/api/board/${activeBoard.data._id}`)
        .then(res => {
          console.log(res)
            if(res.status == 200) {
                Swal.fire(
                    'Deleted with success',
                    '',
                    'success'
                )
                props.setDeleteBoard(false)
                dataStore.dispatch(GET_BOARDS_REQURST())
            }
        }).catch(err => {
            console.log(err.message)
        })
      }
      console.log("sellect one")
  }
  return (
    <div className='layer'>
        <div className='box' ref={box}>
            <h3 className='text-[#ea5555] font-bold text-xl'>Delete this board?</h3>
            <p className='my-4 text-[#828fa3] text-sm font-semibold'>Are you sure you want to delete the { activeBoard.data.name } board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className='flex justify-between'>
                <button type="button" className='w-[48%] bg-[#ea5555] px-4 py-2 font-bold text-white text-sm rounded-full hover:opacity-50 duration-300' onClick={() => deleteBoard()}>Delete</button>
                <button type="button" className='w-[48%] bg-[#f0effa] px-4 py-2 font-bold text-[#635fc7] text-sm rounded-full hover:opacity-50 duration-300' onClick={() => props.setDeleteBoard(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
