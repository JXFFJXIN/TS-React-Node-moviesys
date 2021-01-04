import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import AddMovie from "./movie/AddMovie";
import EditMovie from "./movie/EditMovie";
import MovieList from "./movie/MovieList";
import { Layout,Menu } from "antd";
import BookList from "./book/BookList";
import EditBook from "./book/EditBook";
import AddBook from "./book/AddBook";
import ProtectedRoute from "./guard/ProtectedRoute";
import UserLogin from "./user/UserLogin"
const {
    Header, Sider, Content,
} = Layout;

const _Layout: React.FC = function () {
    return (
        <div className="container">
            <Layout>
                <Header className="header">
                    <NavLink to="/">电影管理系统</NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            theme="dark"
                        >   
                            <Menu.Item key="1">
                                <NavLink to="/">首页</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to="/movie">电影列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink to="/movie/add">添加电影</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to="/book">书目列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <NavLink to="/book/add">添加书目</NavLink>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <NavLink to="/login">登录注销</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className="main">
                            <Switch>
                                <Route path="/login" component={UserLogin}></Route>
                                <ProtectedRoute path="/movie" component={MovieList} exact={true}></ProtectedRoute>
                                <ProtectedRoute path="/movie/add" component={AddMovie}></ProtectedRoute>
                                <ProtectedRoute path="/movie/edit/:id" component={EditMovie}></ProtectedRoute>
                                <ProtectedRoute path="/book" component={BookList} exact={true}></ProtectedRoute>
                                <ProtectedRoute path="/book/add" component={AddBook}></ProtectedRoute>
                                <ProtectedRoute path="/book/edit/:id" component={EditBook}></ProtectedRoute>
                                <Route path="/" component={Home} exact={true}></Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default _Layout;