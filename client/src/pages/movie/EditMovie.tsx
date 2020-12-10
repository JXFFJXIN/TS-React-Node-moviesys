import React from "react";
import { RouteComponentProps } from "react-router";

interface IParams {
    id:string
}
/**
 * 获取地址栏中的params
 * @ 使用RouteComponentPropse<>泛型
 */
class edit extends React.Component<RouteComponentProps<IParams>> {
    render(){
        return (
            <h1>
                修改电影页
                _id:{this.props.match.params.id}
            </h1>
        )
    }
}

export default edit; 