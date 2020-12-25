import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Switch } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { IBookState } from "../redux/reducers/BookReducer";
import { IBook } from "../services/BookService";
import { SwitchType } from "../services/CommonTypes";
import defaultImg from "../assets/default.jpg";

export interface IBookTableEvents {
    onLoad: () => void;
    onKeyChange: (key: string) => void;
    onChange: (page: number) => void;
    onSearch: () => void;
    onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void
    onDelete: (id: string) => Promise<void>
}

class table extends React.Component<IBookTableEvents & IBookState>{
    componentDidMount() {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }
    private getFilterDropdown(prop: object): ReactNode {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    value={this.props.condition.key}
                    onChange={e => this.props.onKeyChange(e.target.value)}
                    onPressEnter={this.props.onSearch}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                    onClick={this.props.onSearch}
                >
                    搜索
                </Button>
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => {
                        this.props.onKeyChange("");
                        this.props.onSearch()
                    }}
                >
                    重置
                </Button>
            </div>
        )
    }

    private getColumns(): ColumnsType<IBook> {
        return [
            {
                title: "封面",
                dataIndex: "poster",
                render(poster) {
                    if (poster) {
                        return (
                            <img src={poster} alt="" className="tablePoster" />
                        )
                    } else {
                        return (
                            <img src={defaultImg} alt="" className="tablePoster" />
                        )
                    }
                }
            }, {
                title: "名称",
                dataIndex: "name",
                filterDropdown: this.getFilterDropdown.bind(this),
                filterIcon: <SearchOutlined />
            }, {
                title: "作者",
                dataIndex: "author",
                render(text: string) {
                    return text;
                }
            }, {
                title: "是否热映",
                dataIndex: "isHot",
                render: (isHot: boolean, record) => {
                    return <Switch
                        checked={isHot}
                        onChange={(newVal) => {
                            console.log(newVal)
                            this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!);
                        }}
                    />
                }
            }, {
                title: "即将上映",
                dataIndex: "isComing",
                render: (isComing: boolean, record) => {
                    return <Switch
                        checked={isComing}
                        onChange={(newVal) => {
                            console.log(newVal)
                            this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!);
                        }}
                    />
                }
            }, {
                title: "经典影片",
                dataIndex: "isClassic",
                render: (isClassic: boolean, record) => {
                    return <Switch
                        checked={isClassic}
                        onChange={(newVal) => {
                            console.log(newVal)
                            this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!);
                        }}
                    />
                }
            }, {
                title: "操作",
                dataIndex: "_id",
                render: (id) => {
                    return (
                        <div>
                            <NavLink
                                to={`/book/edit/${id}`}
                            >
                                <Button
                                    type="primary"
                                    size="small"
                                >
                                    编辑
                                </Button>
                            </NavLink>
                            <Popconfirm
                                title="是否删除该书目？"
                                onConfirm={
                                    async () => {
                                        await this.props.onDelete(id)
                                        message.success("删除成功")
                                    }
                                }
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button
                                    type="text"
                                    size="small"
                                >删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    getPageConfig(): TablePaginationConfig | false {
        if (this.props.total === 0) {
            return false;
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total,
        }
    }

    handleChange(pagination: TablePaginationConfig) {
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
            >
            </Table>
        )
    }
}

export default table;