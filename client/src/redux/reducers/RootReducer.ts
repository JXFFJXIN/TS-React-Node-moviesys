import { combineReducers } from "redux";
import book, { IBookState } from "./BookReducer";
import movie, { IMovieState } from "./MovieReducer";
import user, { IUserState } from "./UserReducer";

/**
 * 整个网站的根状态
 */
export interface IRootState {
    movie:IMovieState,
    book:IBookState,
    user:IUserState,
}

/**
 * 利用redux中的combineReducers方法来合并Reducer
 */
export const rootReducer = combineReducers({
    movie,
    book,
    user
})