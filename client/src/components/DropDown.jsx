import React , {useEffect , useRef}  from 'react'
import store from "../store/UI/StoreConfiguration";
import{ showAddBoard} from "../store/UI/Reducer";

export default function DropDown(props) {
    const show = () => store.dispatch(showAddBoard())
    const box = useRef()
    useEffect(()=> {
      let handelEvent = (e) => {
          if(!box.current.contains(e.target) && !props.btn.current.contains(e.target) ){
            props.setDropDown(false)
          }
      }
      document.addEventListener('mousedown', handelEvent)
      return()=> document.removeEventListener('mousedown', handelEvent)
  })
  return (
    <div className='absolute top-0 right-0 left-0 bottom-0 bg-black/[.5]'>
        <div className='w-[400px] px-8 py-6 bg-[#2B2C37] rounded overflow-hidden mt-[100px]' ref={box}>
            <h2 className='text-[#828fa3] uppercase text-xs tracking-[3px] font-bold'>All boards (2)</h2>
            <ul className='my-4'>
                <button className='w-[100%] py-2 mb-2 flex item-center font-bold capitalize text-[#828fa3]'>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className='mr-3 mt-1'><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"></path></svg>
                    marketing plan
                </button>
                <button className=' w-[100%] bg-[#635FC7] py-2 mb-2 text-white flex item-center font-bold capitalize rounded-r-full relative  after:absolute after:w-[50px] after:h-[100%] after:bg-[#635FC7] after:top-0 after:left-[-50px]'>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className='mr-3 mt-1'><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"></path></svg>
                    roadmap
                </button>
                <button className=' py-2 mb-2 flex item-center font-bold capitalize text-[#828fa3] hover:text-[#635FC7] duration-300'  onClick={() => show()}>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className='mr-3 mt-1'><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor"></path></svg>
                    + create new bord
                </button>
            </ul>
        </div>
    </div>
  )
}
