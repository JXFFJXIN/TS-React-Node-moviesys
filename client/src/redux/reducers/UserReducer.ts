import { Reducer } from "react";
import { IUser } from "../../services/UserService";
import  { UserAction,SaveUserAction, SetConditionAction, SetLoadingAction, SetLoginAction } from "../actions/UserAction";

export type IUserCondition = Required<IUser>;

export interface IUserState {
    data:IUser;
    condition:IUser;
    isLoading:boolean;
    isLogin:boolean;
}
const defaultState = {
    data:{
        loginId:"",
        loginPwd:""
    },
    condition:{
        loginId:"",
        loginPwd:""
    },
    isLoading:false,
    isLogin:false,
}

type UserReducer<T> = Reducer<IUserState,T>

const saveUser:UserReducer<SaveUserAction> = function (state,action) {
    return {
        ...state,
        data:action.payload.user,
    }
}

const setCondition:UserReducer<SetConditionAction> = function (state,action){
    const newState = {
        ...state,
        condition:{
            ...state.condition,
            ...action.payload
        }
    }
    return newState;
}

const setLoading:UserReducer<SetLoadingAction> = function (state,action){
    return {
        ...state,
        isLoading:action.payload
    }
} 

const setLogin:UserReducer<SetLoginAction> = function(state,action){
    return {
        ...state,
        isLogin:action.payload
    }
}

export default function (state:IUserState = defaultState,action:UserAction){
    switch(action.type){
        case "user_save":
            return saveUser(state,action);
        case "user_setCondition":
            return setCondition(state,action);
        case "user_setLoading":
            return setLoading(state,action);
        case "user_setLogin":
            return setLogin(state,action);
        default:
            return state;
    }
}