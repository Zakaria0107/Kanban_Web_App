import React  , {useEffect , useRef} from 'react'

export default function UpdateDelete(props) {
  const box = useRef()

  
  useEffect(()=> {
    let handelEvent = (e) => {
          if(!box.current.contains(e.target) ){
            props.setEditDelete(false)
          }
        }
    document.addEventListener('mousedown', handelEvent)
    return()=> document.removeEventListener('mousedown', handelEvent)
  })

  
  const showUpdateTask = () => {
    props.setTaskDetailsBox(false)
    props.setShowUpdateDelete(false)
    props.setupdateTask(true)
  }
  
  const showDeleteTask = () => {
    props.setTaskDetailsBox(false)
    props.setShowUpdateDelete(false)
    props.setDeleteTask(true)
  }
  return (
    <div className='absolute right-4 top-[80px] bg-[#20212C] p-4 pr-12 rounded shadow-md ' ref={box}>
        <button type="button" className='block mb-4 text-[#828fa3] font-medium hover:opacity-60' onClick={()=> showUpdateTask()}>Edit Board</button>
        <button type="button" className='block text-[#ea5555] font-medium hover:opacity-60' onClick={() => showDeleteTask()} >Delete Board</button>
    </div>
  )
}