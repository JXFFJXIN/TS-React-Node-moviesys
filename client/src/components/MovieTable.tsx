import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import {Switch, Table} from "antd";
import { ColumnsType } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultImg from "../assets/default.jpg";
import { SwitchType } from "../services/CommonTypes";

export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void;
    onSwitchChange:(type:SwitchType,newState:boolean,id:string)=>void
}
/**
 * @ 使用交叉类型定义返回值
 * @ 便于后期赋值方法
 */
class table extends React.Component<IMovieTableEvents&IMovieState> {

    /**
     * 生命周期 - 加载之后
     */
    componentDidMount(){
        if(this.props.onLoad){
            this.props.onLoad();
        }
    }

    /**
     * 配置columns属性
     * @ title  :string 名称
     * @ dataIndex  :string 数据
     * @ render  :function渲染
     */
    private getColumns():ColumnsType<IMovie>{
        return [
            {
                title:"封面",
                dataIndex:"poster",
                render(poster){
                    if(poster){
                        return (<img className="tablePoster" src={poster}/>)
                    }else{
                        return (<img className="tablePoster" src={defaultImg}/>)
                    }
                }
            },
            {title:"名称",dataIndex:"name"},
            {
                title:"类型",
                dataIndex:"types",
                render(text:string[]){
                    return text.join("，")
                }
            },
            {
                title:"地区",
                dataIndex:"areas",
                render(text:string[]){
                    return text.join("，")
                }
            },
            {
                title:"时长",
                dataIndex:"timeLong",
                render(timeLong:string){
                    return `${timeLong}分钟`
                }
            },
            {
                title:"是否热映",
                dataIndex:"isHot",
                render:(isHot:boolean,record)=>{
                    return <Switch checked={isHot} onChange={(newVal)=>{
                        this.props.onSwitchChange(SwitchType.isHot,newVal,record._id!);
                    }}/>
                }
            },
            {
                title:"即将上映",
                dataIndex:"isComing",
                render:(isComing:boolean,record)=>{
                    return <Switch checked={isComing} onChange={(newVal)=>{
                        this.props.onSwitchChange(SwitchType.isComing,newVal,record._id!);
                    }}/>
                }
            },
            {
                title:"经典影片",
                dataIndex:"isClassic",
                render:(isClassic:boolean,record)=>{
                    return <Switch checked={isClassic} onChange={(newVal)=>{
                        this.props.onSwitchChange(SwitchType.isClassic,newVal,record._id!);
                    }}/>
                }
            },
        ]
    }

    render(){
        return (
            <Table rowKey="_id" dataSource={this.props.data} columns={this.getColumns()}></Table>            
        )
    }
}

export default table;