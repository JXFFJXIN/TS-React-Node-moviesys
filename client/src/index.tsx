import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";

// 被中间件redux-logger替代
// store.subscribe(()=>{
//   console.log(store.getState())
// })

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// 界面
// 库：antd
// 引入css文件antd/dist/antd.css

// 路由
// 库A：react-router
// 库B：react-router-dom

// redux 状态管理
// 大型项目中使用
// 不是所有的状态数据都需要放到redux中
// action:平面对象，plain object，它描述了数据变化的方式
// reducer:数据变化的具体内容，它需要一个action来触发
// store：存储数据的仓库
// store.subscribe可以使用中间件来处理redux-logger
// 副作用：redux-thunk、redux-saga（最好，难度高）、dva（saga封装，脚手架）、umijs（dva延申）
