import React from 'react';
import _Layout from './pages/Layout';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store"

// BrowserRouter
// - Route设置路由 （path设置路径 component设置路由组件）
// Provider 
// - react-redux提供的数据包裹层
// - 需要配置参数store

// 函数组件
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={_Layout}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
