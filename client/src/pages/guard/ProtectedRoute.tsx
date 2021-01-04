// 登录和注册的跳转
import React, { Dispatch, useContext, useState } from "react";
import { connect } from "react-redux";
import { Route,Redirect} from "react-router-dom";
import { IUserProp } from "../../components/UserForm";
import UserAction from "../../redux/actions/UserAction";
import { IRootState } from "../../redux/reducers/RootReducer";
import { IUserState } from "../../redux/reducers/UserReducer";
import { store } from "../../redux/store";
import { IUser } from "../../services/UserService";
// React-Router 中的Route组件中有render属性
    // 可以是一个函数返回一个可以渲染的内容
    // 函数可以接收一个参数，返回上下文的属性
// React-Router 中的Route组件中有children属性
    // 与render属性的区别是无论是否匹配都会运行
// Redirect 组件是专门用于跳转页面

function mapStateToProps(state:IRootState):IUserState{
    return state.user;
}

const HOC = connect(mapStateToProps);

const ProtectedRoute = HOC(_ProtectedRoute);

function _ProtectedRoute({component:Component,children,render,...rest}:any):any{
    return (
        <Route
        {...rest}
        render={(values)=>{
            const returnurl = values.location.pathname;
            if(rest.isLogin){
                return <Component {...rest}/>
            }else{
                return <Redirect to={{
                    pathname:"/login",
                    // search:`?returnurl=${returnurl}`
                    state:returnurl
                }}/>
            }
        }}
        />
    )
}

export default ProtectedRoute;
// 登录以及跳转
// 1. 登录页面添加事件{登录成功后对某变量变为true}
// 2. 创建一个新的路由对render属性进行包装，当变量为true是渲染目标，否则进行Redirect组件跳转
// 3. 方式1：在Redirect设置to属性，添加search
    // 登录页面使用qs对网址进行分析判断
// 3. 方式2：在Redirect设置to属性，添加state
    // 登录页面直接判断props.location.state
