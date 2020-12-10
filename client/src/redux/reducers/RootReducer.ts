import { combineReducers } from "redux";
import movie, { IMovieState } from "./MovieReducer";

/**
 * 整个网站的根状态
 */
export interface IRootState {
    movie:IMovieState,

}

/**
 * 利用redux中的combineReducers方法来合并Reducer
 */
export const rootReducer = combineReducers({
    movie,
    
})