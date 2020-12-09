import { combineReducers } from "redux";
import movie from "./MovieReducer";
/**
 * 利用redux中的combineReducers方法来合并Reducer
 */
export const rootReducer = combineReducers({
    movie,
    
})