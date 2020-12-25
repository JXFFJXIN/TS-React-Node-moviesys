import { Reducer } from "react";
import { IBook } from "../../services/BookService";
import { ISearchCondition } from "../../services/CommonTypes";
import  {BookAction, BookChangeSwitchAction, DeleteAction, SaveBookAction, SetConditionAction, SetLoadingAction } from "../actions/BookAction";

export type IBookCondition = Required<ISearchCondition>

export interface IBookState {
    data:IBook[];
    condition:IBookCondition;
    total:number;
    isLoading:boolean;
    totalPage:number;
}

const defaultState:IBookState = {
    data:[],
    condition:{
        page:1,
        limit:10,
        key:""
    },
    total:0,
    isLoading:false,
    totalPage:0
}

type BookReducer<T> = Reducer<IBookState,T>

const saveBook:BookReducer<SaveBookAction> = function (state,action) {
    return {
        ...state,
        data:action.payload.books,
        total:action.payload.total,
        totalPage:Math.ceil(action.payload.total/state.condition.limit)
    }
}
const setCondition:BookReducer<SetConditionAction> = function (state,action){
    const newState = {
        ...state,
        condition:{
            ...state.condition,
            ...action.payload
        },
    };
    newState.totalPage = Math.ceil(newState.total/newState.condition.limit)
    return newState;
}
const setLoading:BookReducer<SetLoadingAction> = function (state,action){
    return {
        ...state,
        isLoading:action.payload
    }
}
const deleteBook:BookReducer<DeleteAction> = function(state,action){
    return {
        ...state,
        data:state.data.filter(m=>m._id !== action.payload),
        total:state.total - 1,
        totalPage:Math.ceil((state.total - 1)/state.condition.limit)
    }
}
const changeSwitch:BookReducer<BookChangeSwitchAction> = function (state,action){
    const book = state.data.find(d=>d._id === action.payload.id);
    if(!book){
        return state;
    }
    const newBook = {...book};
    newBook[action.payload.type] = action.payload.newVal;
    const newData = state.data.map(d=>{
        if(d._id === action.payload.id){
            return newBook;
        }
        return d;
    })
    return {
        ...state,
        data:newData
    }
}
export default function (state:IBookState = defaultState,action:BookAction){
    switch (action.type){
        case "book_delete":
            return deleteBook(state,action);

        case "book_save":
            return saveBook(state,action);

        case "book_setCondition":
            return setCondition(state,action);

        case "book_setLoading":
            return setLoading(state,action);

        case "book_switch":
            return changeSwitch(state,action);

        default:
            return state;
    }
}