import axios from 'axios'
import React , {useRef , useEffect , useState} from 'react'
import dataStore from "../../store/DATA/StoreConfiguration"

import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';

import Swal from 'sweetalert2'

export default function UpdateBoard(props) {
    const box = useRef()
    const [data , setData]= useState(dataStore.getState().filter(elt => elt.status === true)[0]?.data)
    const [columns , setColumns] = useState(data.columns)
    const [name , setName] = useState(data.name)
    useEffect(()=> {
    let handelEvent = (e) => {
          if(!box.current.contains(e.target) ){
            props.setUpdateBoard(false)
          }
        }
    document.addEventListener('mousedown', handelEvent)
    return()=> document.removeEventListener('mousedown', handelEvent)
  })
  dataStore.subscribe(() => {
    setData(dataStore.getState().filter(elt => elt.status === true)[0]?.data)
  })
  const  removeColumn = (id) => {
    setColumns(columns.filter((elt , index) => index != id))
  }
  const updateBoard = () => {
    axios.put(`http://localhost:3001/api/board/${data._id}` , {
      name : name , 
      columns : columns
    }).then(res => {
        Swal.fire(
          'Updated with success',
          '',
          'success'
      )
      dataStore.dispatch(GET_BOARDS_REQURST())
      props.setUpdateBoard(false)

    })
    .catch(err => console.log(err))
  }
  return (
    <div className='layer'>
        <div className='box' ref={box} >
            <div className='flex justify-between items-center'>
                <h3 className='text-white font-bold text-xl'>Edit Board</h3>
                <button type="button" onClick={() => props.setUpdateBoard(false) } ><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
            </div>
            <div className='mt-4'> 
                <label className='label'>Name</label>
                <input type="text" className='field' value={name}  onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='my-4'> 
                <label className='label'>Columns</label>
                {columns.map((elt , index) =>
                  <div className='flex justify-between items-center'>
                      <input type="text" className='field mb-2 w-[90%]' value={elt.name} onChange={(e ) => {
                        let arr = columns
                        arr = arr.map((elt1 , i ) => index == i ? {...elt , name : e.target.value} : elt1)
                        setColumns(arr)
                      }}/>
                      <button type="button"  onClick={() => removeColumn(index)}><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
                  </div> 
                )}
                
            </div>
            <button type='button' className='actions_btns text-white bg-[#635fc7]' onClick={() => updateBoard()} >Save changes</button>
        </div>
    </div>
  )
}
