import React, { ReactNode, VoidFunctionComponent } from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Button, Input, message, Popconfirm, Switch, Table  } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultImg from "../assets/default.jpg";
import { SwitchType } from "../services/CommonTypes";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void;
    onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void
    onDelete:(id:string)=>Promise<void>,
    onChange:(page:number)=>void
    onKeyChange:(key:string)=>void
    onSearch:()=>void
}
/**
 * @ 使用交叉类型定义返回值
 * @ 便于后期赋值方法
 */
class table extends React.Component<IMovieTableEvents & IMovieState> {

    /**
     * 生命周期 - 加载之后
     */
    componentDidMount() {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    private getFilterDropdown(prop:object):ReactNode{
        return (
            <div style={{padding:8}}>
                <Input
                    style={{width:188,marginBottom:8,display:'block'}}
                    value={this.props.condition.key}
                    onChange={e=>this.props.onKeyChange(e.target.value)}
                    onPressEnter={this.props.onSearch}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    size="small"
                    style={{width:90,marginRight:8}}
                    onClick={this.props.onSearch}
                >
                    搜索
                </Button>
                <Button
                    size="small"
                    style={{width:90}}
                    onClick={()=>{
                        this.props.onKeyChange("");
                        this.props.onSearch()
                    }}
                >
                    重置
                </Button>
            </div>
        )
    }

    /**
     * 配置columns属性
     * @ title  :string 名称
     * @ dataIndex  :string 数据
     * @ render  :function渲染
     */
    private getColumns(): ColumnsType<IMovie> {
        return [
            {
                title: "封面",
                dataIndex: "poster",
                render(poster) {
                    if (poster) {
                        return (<img alt="" className="tablePoster" src={poster} />)
                    } else {
                        return (<img alt="" className="tablePoster" src={defaultImg} />)
                    }
                }
            },
            { 
                title: "名称", 
                dataIndex: "name",
                filterDropdown:this.getFilterDropdown.bind(this),
                filterIcon:<SearchOutlined />
            },
            {
                title: "类型",
                dataIndex: "types",
                render(text: string[]) {
                    return text.join("，")
                }
            },
            {
                title: "地区",
                dataIndex: "areas",
                render(text: string[]) {
                    return text.join("，")
                }
            },
            {
                title: "时长",
                dataIndex: "timeLong",
                render(timeLong: string) {
                    return `${timeLong}分钟`
                }
            },
            {
                title: "是否热映",
                dataIndex: "isHot",
                render: (isHot: boolean, record) => {
                    return <Switch checked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!);
                    }} />
                }
            },
            {
                title: "即将上映",
                dataIndex: "isComing",
                render: (isComing: boolean, record) => {
                    return <Switch checked={isComing} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!);
                    }} />
                }
            },
            {
                title: "经典影片",
                dataIndex: "isClassic",
                render: (isClassic: boolean, record) => {
                    return <Switch checked={isClassic} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!);
                    }} />
                }
            },
            {
                title: "操作",
                dataIndex: "_id",
                render: (id) => {
                    return (
                        <div>
                            <NavLink to={`/movie/edit/${id}`}>
                                <Button type="primary" size="small">编辑</Button>
                            </NavLink>
                            <Popconfirm title="是否确定删除该影片？" onConfirm={
                                async ()=>{
                                    await this.props.onDelete(id)
                                    message.success("删除成功")
                                }} okText="确定" cancelText="取消">
                            <Button type="text" size="small">删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ]
    }

    getPageConfig():TablePaginationConfig|false{
        if(this.props.total === 0){
            return false;
        }
        return {
            current:this.props.condition.page,
            pageSize:this.props.condition.limit,
            total:this.props.total,
        }
    }

    handleChange(pagination:TablePaginationConfig){
        this.props.onChange(pagination.current!);
    }

    render() {
        return (
            <Table 
            rowKey="_id" 
            dataSource={this.props.data} 
            columns={this.getColumns()}
            pagination={this.getPageConfig()}
            onChange={this.handleChange.bind(this)}
            loading={this.props.isLoading}
            ></Table>
        )
    }
}

export default table;