import {combineReducers} from "redux"
import reducer from "./reducer"
const rootReducer = combineReducers({
    Contacts: reducer,
})
export default rootReducer