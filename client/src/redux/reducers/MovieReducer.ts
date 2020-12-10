// 描述电影列表的状态类型

import { Reducer } from "react";
import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { DeleteAction, MovieAction, MovieChangeSwitchAction, SaveMoviesAction, SetConditionAction, SetLoadingAction } from "../actions/MovieAction";


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
    /**
     * 总页数
     */
    totalPage:number;

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
    isLoading: false,
    totalPage:0
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
        total:action.payload.total,
        totalPage:Math.ceil(action.payload.total/state.condition.limit)
    }
}

const setCondition:MovieReducer<SetConditionAction> = function(state,action){
    const newState =  {
        ...state,
        condition:{
            ...state.condition,
            ...action.payload
        },
    };
    newState.totalPage = Math.ceil(newState.total/newState.condition.limit)
    return newState;
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
        total:state.total - 1,
        totalPage:Math.ceil((state.total - 1)/state.condition.limit)
    }
}

const changeSwitch:MovieReducer<MovieChangeSwitchAction> = function (state,action){
    // 1. 根据id找到对象
    const movie = state.data.find(d=>d._id === action.payload.id);
    if(!movie){
        return state;
    }
    // 2. 对象克隆
    const newMovie = {...movie};
    // 3. 更新数据
    newMovie[action.payload.type] = action.payload.newVal;
    // 4. 将对象重新放入数组中
    const newData = state.data.map(d=>{
        if(d._id === action.payload.id){
            return newMovie;
        }
        return d;
    })
    return {
        ...state,
        data:newData
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
        case "movie_switch":
            return changeSwitch(state,action)
        default:
            return state;
    }
}