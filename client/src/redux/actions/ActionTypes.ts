// 定义Action的类型
export interface IAction<T extends string,P>{
    type:T
    payload:P
}