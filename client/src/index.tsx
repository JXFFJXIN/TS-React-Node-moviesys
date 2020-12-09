import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

// 被中间件redux-logger替代
// store.subscribe(()=>{
//   console.log(store.getState())
// })

store.dispatch(MovieAction.setLoadingAction(true));

store.dispatch(MovieAction.setConditionAction({
  key:"1215",
  page:8
}))

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// 界面

// 路由

// redux 状态管理
// 大型项目中使用
// 不是所有的状态数据都需要放到redux中
// action:平面对象，plain object，它描述了数据变化的方式
// reducer:数据变化的具体内容，它需要一个action来触发
// store：存储数据的仓库
// store.subscribe可以使用中间件来处理redux-logger