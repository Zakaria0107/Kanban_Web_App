import React  , {useRef ,useState , useEffect} from 'react'

import dataStore from "../../store/DATA/StoreConfiguration"
import { GET_BOARDS_REQURST } from '../../store/DATA/Reducer';

import axios from 'axios';
import Swal from 'sweetalert2'

export default function AddColumn(props) {
    const [columns , setColumns] = useState([""])
    const box = useRef()

    const removeColumn = (i) => {
        setColumns(columns.filter((elt, index) => index !== i ))
    }

    useEffect(()=> {
        let handelEvent = (e) => {
            if(!box.current.contains(e.target)){
                props.setAddColumn(false)
            }
        }
        document.addEventListener('mousedown', handelEvent)
        return()=> document.removeEventListener('mousedown', handelEvent)
    })

    const addColumns = () => {
        let cols = []
        columns.forEach(elt => {
            cols.push({name : elt})
        })
        const user_id = localStorage.getItem("id")
        const get_token = localStorage.getItem('token')
        axios.post(`${process.env.REACT_APP_API_URL}/board/${user_id}/${props.board._id}`, {columns : cols},
        { headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${get_token}`
            }} )
        .then(res => {
            if(res.status == 200) {
                Swal.fire(
                    'Added with success',
                    '',
                    'success'
                )
                props.setAddColumn(false)
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
                    <h3 className='text-white font-bold text-xl'>Add New Column(s)</h3>
                    <button type="button" onClick={()=> props.setAddColumn(false) }><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
                </div>
                <div className='my-4'> 
                    <label className='label'>Columns</label>
                    {columns.map((elt , index) => 
                        (<div className='flex justify-between items-center' key={index}>
                            <input type="text" className='field mb-2 w-[90%]'  onChange={(event) => columns[index]=event.target.value} />
                            <button type="button" onClick={() => removeColumn(index)} ><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg></button>
                        </div>))}
                </div>
                <button type='button' className='actions_btns text-[#635fc7] bg-white ' onClick={() => setColumns([...columns , ""])}>+ Add New Column</button>
                <button type='button' className='actions_btns text-white bg-[#635fc7]' onClick={() => addColumns()}>Create New Board</button>
            </div>
        </div>
  )
}
