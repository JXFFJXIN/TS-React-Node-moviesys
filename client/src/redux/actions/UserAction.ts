import { ThunkAction } from "redux-thunk";
import { ISearchCondition } from "../../services/CommonTypes";
import { IUser, UserService } from "../../services/UserService";
import { IRootState } from "../reducers/RootReducer";
import { IAction } from "./ActionTypes";
/**
 * 根据IAction接口制作类型
 */
export type SaveUserAction = IAction<"user_save",{
    user:IUser;
}>;
/**
 * 保存用户数据
 * @param user 用户数据
 */
function saveUserAction(user:IUser):SaveUserAction{
    return {
        type:"user_save",
        payload:{
            user,        
        }
    }
}
/**
 * 根据IAction接口制作类型
 */
export type SetLoadingAction = IAction<"user_setLoading",boolean>;
/**
 * 设置状态是否为加载行为
 * @param isLoading 是否加载
 */
function setLoadingAction(isLoading:boolean):SetLoadingAction{
    return {
        type:"user_setLoading",
        payload:isLoading
    }
}
/**
 * 根据IAction接口制作类型
 */
export type SetConditionAction = IAction<"user_setCondition",ISearchCondition>;
/**
 * 设置查询条件行为
 * @param condition 查询条件
 */
function setConditionAction(condition:ISearchCondition):SetConditionAction{
    return {
        type:"user_setCondition",
        payload:condition
    }
}
/**
 * 根据IAction接口制作类型
 */
export type SetLoginAction = IAction<"user_setLogin",boolean>;
/**
 * 设置状态是否为加载行为
 * @param isLogin 是否加载
 */
function setLoginAction(isLogin:boolean):SetLoginAction{
    return {
        type:"user_setLogin",
        payload:isLogin
    }
}

export type UserAction = SetLoginAction|SaveUserAction|SetConditionAction|SetLoadingAction

function registerAction(user:IUser):ThunkAction<Promise<void>,IRootState,any,UserAction>{
    return async (dispatch,getState)=>{
        dispatch(setLoadingAction(true));
        const resp = await UserService.add(user);
        if(resp.data){
            dispatch(saveUserAction(resp.data));
        }
        dispatch(setLoadingAction(false));
    }
}

function loginAction(loginId:string,loginPwd:string):ThunkAction<Promise<void>,IRootState,any,UserAction>{
    return async (dispatch,getState)=>{
        console.log("111")
        dispatch(setLoadingAction(true));
        const resp = await UserService.login(loginId,loginPwd);
        if(resp.data){
            dispatch(setLoginAction(true))
        }
        dispatch(setLoadingAction(false));
    }
}

function whoamiAction(id:string):ThunkAction<Promise<void>,IRootState,any,UserAction>{
    return async (dispatch,getState)=>{
        dispatch(setLoadingAction(true));
        const resp = await UserService.whoami(id);
        if(resp.data){
            dispatch(saveUserAction(resp.data));
        }   
        dispatch(setLoadingAction(false));
    }
}


export default {
    setConditionAction,
    setLoadingAction,
    saveUserAction,
    registerAction,
    loginAction,
    whoamiAction
}