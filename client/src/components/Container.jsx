import React, { useState } from 'react'
import dataStore from '../store/DATA/StoreConfiguration';
import ScrollContainer from 'react-indiana-drag-scroll'
import TaskDetails from './Task/TaskDetails';
import DeleteTask from './Task/DeleteTask';
import UpdateTask from './Task/UpdateTask';
import AddColumn from './board/AddColumn';

export default function Container() {
    const colors = ["#8471F2" , "#49C4E5" , "#67E2AE" , "#E5A449" , "#e5a449" , "#c36e6e" , "#2a9d8f" , "#f4a261" , "#ffb703" , "#bc6c25"]
    const [data , setData] = useState(dataStore.getState().filter(elt => elt.status === true)[0]?.data)

    const [taskDetailsBox , setTaskDetailsBox] = useState(false)
    const [deleteTask , setDeleteTask] = useState(false)
    const [updateTask , setupdateTask] = useState(false)
    const [addColumn , setAddColumn] = useState(false)

    const [task , setTask] = useState([])
    const [columns , setColumns] = useState([])

    dataStore.subscribe(() => {
        setData(dataStore.getState().filter(elt => elt.status === true)[0]?.data)
        setColumns(data?.columns)
    })
  return (
    <div className='bg-[#20212C]  h-[calc(100vh-100px)] '>
        <ScrollContainer hideScrollbars={false} className=' cursor-move p-2  w-[100%] h-[100%] overflow-scroll flex justify-start scrollbar scrollbar-thumb-[#2B2C37] scrollbar-track-[#20212C]  '>
          {data?.columns?.map((elt , index )=> 
            <div className='w-[280px] m-4 shrink-0' >
              <h4 className='text-[#828fa3] uppercase text-xs tracking-[3px] font-semibold flex items-center'><span style={{backgroundColor: colors[index%10]}} className={`block w-[15px] h-[15px] bg-[${colors[index]}] rounded-full m-2`} ></span>{elt.name} ({elt.tasks?.length})</h4>
              {elt.tasks?.map(elt1 => 
                <div className='cursor-pointer w-[100%] bg-[#2B2C37] rounded-lg  py-6 px-4 border-[.01em] border-[#3E3F4E] mt-4 hover:opacity-50 duration-300'  onClick={() => {setTaskDetailsBox(true) ; setTask(elt1)}} >
                  <h3 className='text-white font-semibold text-base mb-3'>{elt1.title}</h3>
                  <p className='text-[#828fa3] font-semibold text-xs'>{elt1.subTasks?.length} subtasks</p>
                </div>
              )}
            </div>
        
        )}   
        
        {data?._id  ? <div className='w-[280px] h-[100%] m-4  mt-14 shrink-0 bg-[#2B2C37] flex justify-center items-center cursor-pointer hover:opacity-50 duration-300 rounded-lg group' onClick={() => setAddColumn(true)}>
          <h1 className='text-[#828fa3] font-bold text-2xl group-hover:text-[#635FC7] duration-300 '>+ Add Column </h1>
        </div> : ""}
        </ScrollContainer>
        {taskDetailsBox ? <TaskDetails setTaskDetailsBox={setTaskDetailsBox} setDeleteTask = {setDeleteTask} setupdateTask= {setupdateTask} task={task} columns={columns}  />  : null}
        {deleteTask ? <DeleteTask setDeleteTask = {setDeleteTask} task={task} /> : null }
        {updateTask ? <UpdateTask setupdateTask = {setupdateTask} task={task} /> : null}
        {addColumn ? <AddColumn setAddColumn={setAddColumn} board={data} /> : null}
    </div>
  )
}
