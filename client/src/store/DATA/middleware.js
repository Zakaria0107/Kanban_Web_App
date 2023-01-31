import axios from "axios"
import { GET_BOARDS_REQURST, GET_BOARDS_SUCCESS , GET_BOARDS_FAILD} from './Reducer'

const getData = ({dispatch}) => next => async action => {
    if(action.type == GET_BOARDS_REQURST.type){
        try{
            let res = await fetch("http://localhost:3001/api/board/") 
            let data = await  res.json()
            dispatch(GET_BOARDS_SUCCESS(data))
        }catch(err){
            console.log(err)
            dispatch(GET_BOARDS_FAILD(err))
        }
        
    }
    next(action)
    
}

export default getData