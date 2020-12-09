// action的创建函数

import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { IAction } from "./ActionTypes";

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
 * 可辨识的联合
 */
export type MovieAction = SaveMoviesAction|SetConditionAction|SetLoadingAction|DeleteAction

export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction
};
