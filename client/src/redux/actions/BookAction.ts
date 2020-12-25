import { ThunkAction } from "redux-thunk";
import { BookService, IBook } from "../../services/BookService";
import { ISearchCondition, SwitchType } from "../../services/CommonTypes";
import { IRootState } from "../reducers/RootReducer";
import { IAction } from "./ActionTypes";
/**
 * 根据IAction接口制作类型SaveBookAction
 */
export type SaveBookAction = IAction<"book_save",{
    books:IBook[];
    total:number;
}>;
/**
 * 保存书目数据
 * @param books 书本数组
 * @param total 书目总数
 */
function saveBookAction(books:IBook[],total:number):SaveBookAction{
    return {
        type:"book_save",
        payload:{
            books,
            total
        }
    }
}
/**
 * 根据IAction接口制作类型SaveBookAction
 */
export type SetLoadingAction = IAction<"book_setLoading",boolean>;
/**
 * 设置状态是否为加载行为
 * @param isLoading 是否加载
 */
function setLoadingAction(isLoading:boolean):SetLoadingAction{
    return {
        type:"book_setLoading",
        payload:isLoading
    }
}
/**
 * 根据IAction接口制作类型SetConditionAction
 */
export type SetConditionAction = IAction<"book_setCondition",ISearchCondition>
/**
 * 设置查询条件行为
 * @param condition 查询条件 
 */
function setConditionAction(condition:ISearchCondition):SetConditionAction{
    return {
        type:"book_setCondition",
        payload:condition
    }
}
/**
 * 根据IAction来制作类型DeleteAction
 */
export type DeleteAction = IAction<"book_delete",string>
/**
 * 删除书目行为
 * @param id 书本id
 */
function deleteAction(id:string):DeleteAction{
    return{
        type:"book_delete",
        payload:id
    }
}
/**
 * 根据IAction接口制作类型
 */
export type BookChangeSwitchAction = IAction<"book_switch",{
    type:SwitchType,
    newVal:boolean,
    id:string
}>
/**
 * 更改布尔值行为
 * @param type 目标类型
 * @param newVal 改变后的值
 * @param id 书目id
 */
function changeSwitchAction(type:SwitchType,newVal:boolean,id:string):BookChangeSwitchAction{
    return {
        type:"book_switch",
        payload:{
            type,
            newVal,
            id
        }
    }
}

export type BookAction = BookChangeSwitchAction|SaveBookAction|SetConditionAction|SetLoadingAction|DeleteAction
/**
 * 条件查询书目数组
 * @param condition 查询条件
 */
function fetchBook(condition:ISearchCondition):ThunkAction<Promise<void>,IRootState,any,BookAction>{
    return async (dispatch,getState)=>{
        dispatch(setLoadingAction(true));
        dispatch(setConditionAction(condition));
        const curCondition = getState().book.condition;
        const resp = await BookService.getAll(curCondition)
        dispatch(saveBookAction(resp.data,resp.total))
        dispatch(setLoadingAction(false));
    }
}
/**
 * 通过id删除电影
 * @param id 书目id
 */
function deleteBook(id:string):ThunkAction<Promise<void>,IRootState,any,BookAction>{
    return async (dispatch)=>{
        dispatch(setLoadingAction(true));
        await BookService.delete(id);
        dispatch(deleteAction(id));
        dispatch(setLoadingAction(false));
    }
}

function changeSwitch(type:SwitchType,newVal:boolean,id:string):ThunkAction<Promise<void>,IRootState,any,BookAction>{
    return async (dispatch)=>{
        dispatch(setLoadingAction(true));
        dispatch(changeSwitchAction(type,newVal,id))
        await BookService.edit(id,{
            [type]:newVal
        })
        dispatch(setLoadingAction(false));
    }
}

export default {
    saveBookAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchBook,
    deleteBook,
    changeSwitch
}