// action的创建函数

import { ISearchCondition, SwitchType } from "../../services/CommonTypes";
import { IMovie, MovieService } from "../../services/MovieService";
import { IAction } from "./ActionTypes";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../reducers/RootReducer";
/**
 * 根据IAction来制作类型SaveMoviesAction
 */
export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[];
    total: number;
}>;
/**
 * 保存电影数据
 * @param movies 电影数组 
 * @param total 电影总数
 */
function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    };
}

/**
 * 根据IAction来制作类型SaveLoadingAction
 */
export type SetLoadingAction = IAction<"movie_setLoading",boolean>;
/**
 * 设置状态是否加载行为
 * @param isLoading 是否加载 
 */
function setLoadingAction(isLoading:boolean):SetLoadingAction{
    return {
        type:"movie_setLoading",
        payload: isLoading
    }
}

/**
 * 根据IAction来制作类型SetConditionAction
 */
export type SetConditionAction = IAction<"movie_setCondition",ISearchCondition>
/**
 * 设置查询条件行为
 * @param condition 查询条件
 */
function setConditionAction(condition:ISearchCondition):SetConditionAction{
    return {
        type:"movie_setCondition",
        payload:condition
    }
}

/**
 * 根据IAction来制作类型DeleteAction
 */
export type DeleteAction = IAction<"movie_delete",string>

/**
 * 删除电影行为
 * @param id 电影的_id属性
 */
function deleteAction(id:string):DeleteAction{
    return {
        type:"movie_delete",
        payload:id
    }
}
/**
 * 根据IAction来制作类型MovieChangeSwitchAction
 */
export type MovieChangeSwitchAction = IAction<"movie_switch",{
    type:SwitchType,
    newVal:boolean,
    id:string
}>
/**
 * 更改布尔值行为
 * @param type 目标类型
 * @param newVal 改变后的值
 * @param id 电影id
 */
function changeSwitchAction(type:SwitchType,newVal:boolean,id:string):MovieChangeSwitchAction{
    return {
        type:"movie_switch",
        payload:{
            type,
            newVal,
            id
        }
    }
}
/**
 * 可辨识的联合
 */
export type MovieAction = MovieChangeSwitchAction|SaveMoviesAction|SetConditionAction|SetLoadingAction|DeleteAction

// 副作用处理thunk
/**
 * 副作用-通过条件从服务器中获取电影数组
 * @param condition 查询条件
 */
function fetchMovie(condition:ISearchCondition)
:ThunkAction<Promise<void>,IRootState,any,MovieAction>{
    return async (dispatch,getState)=>{
        // 1. 设置加载状态
        dispatch(setLoadingAction(true));
        // 2. 设置条件
        dispatch(setConditionAction(condition));
        // 3. 获取服务器数据
        const curCondition = getState().movie.condition
        const resp = await MovieService.get(curCondition)
        // 4. 更改仓库数据
        dispatch(saveMoviesAction(resp.data,resp.total))
        // 5. 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}
/**
 * 通过id删除电影
 * @param id 电影的_id
 */
function deleteMovie(id:string)
:ThunkAction<Promise<void>,IRootState,any,MovieAction>{
    return async (dispatch)=>{
        // 1. 设置加载状态
        dispatch(setLoadingAction(true));
        // 2. 删除数据
        await MovieService.delete(id)
        // 3. 更改仓库数据
        dispatch(deleteAction(id))
        // 4. 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

function changeSwitch(type:SwitchType,newVal:boolean,id:string)
:ThunkAction<Promise<void>,IRootState,any,MovieAction>{
    return async (dispatch)=>{
        // 1. 设置加载状态
        dispatch(setLoadingAction(true));
        // 2. 更改仓库状态
        dispatch(changeSwitchAction(type,newVal,id));
        // 3. 在服务器中修改
        await MovieService.edit(id,{
            [type]:newVal
        })
        // 4. 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}


export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovie,
    deleteMovie,
    changeSwitch,
    changeSwitchAction,

};
