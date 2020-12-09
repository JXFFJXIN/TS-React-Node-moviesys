// 描述电影列表的状态类型

import { Reducer } from "react";
import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { DeleteAction, MovieAction, SaveMoviesAction, SetConditionAction, SetLoadingAction } from "../actions/MovieAction";


export type IMovieCondition = Required<ISearchCondition>;

/**
 * 电影状态
 */
export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[];
    /**
     * 查询条件
     */
    condition: IMovieCondition;
    /**
     * 总记录数
     */
    total: number;
    /**
     * 是否正在加载数据
     */
    isLoading: boolean;

}

/**
 * 默认状态
 */
const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false
};
/**
 * Reducer:<S,A>=>S
 */
type MovieReducer<T> = Reducer<IMovieState,T>


const saveMovie:MovieReducer<SaveMoviesAction> = function (state,action){
    // ES5
    // return Object.assign({},state,{
    //     data:action.payload.movies,
    //     total:action.payload.total
    // })
    // ES6
    return {
        ...state,
        data:action.payload.movies,
        total:action.payload.total
    }
}

const setCondition:MovieReducer<SetConditionAction> = function(state,action){
    return {
        ...state,
        condition:{
            ...state.condition,
            ...action.payload
        }

    }
}

const setLoading:MovieReducer<SetLoadingAction> = function(state,action){
    return {
        ...state,
        isLoading:action.payload
    }
}

const deleteMovie:MovieReducer<DeleteAction> = function (state,action){
    return {
        ...state,
        data:state.data.filter(m=>m._id !== action.payload),
        total:state.total - 1
    }
}
/**
 * 根据行为的类型进行不同对状态的操作
 * @param state 状态
 * @param action 行为
 */
export default function (state: IMovieState = defaultState, action: MovieAction) {
    // 可辨识联合
    switch (action.type) {
        case "movie_delete":
            return deleteMovie(state,action);
            
        case "movie_save":
            return saveMovie(state,action);
            
        case "movie_setCondition":
            return setCondition(state,action);
            
        case "movie_setLoading":
            return setLoading(state,action);
            
        default:
            return state;
    }
}