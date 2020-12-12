import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";
import { IResponseData, IResponseError } from "../services/CommonTypes";

interface IImgUploaderProps {
    value?: string
    onChange?: (imgUrl: string) => void
}

interface IImgState {
    showModal: boolean
}

export default class up extends React.Component<IImgUploaderProps, IImgState> {

    state: IImgState = {
        showModal: false
    }

    private getUploadContent() {
        if (this.props.value) {
            return null;
        } else {
            return (
                <div>
                    <PlusOutlined />
                    <div style={{ color: "gray" }} >电影海报</div>
                </div>
            )
        }
    }

    private getFileList(): UploadFile[] {
        if (this.props.value) {
            return [
                {
                    uid: this.props.value,
                    name: this.props.value,
                    url: this.props.value

                }
            ]
        }
        return []
    }

    async handleRequest(p: any) {
        // HTML5表达传输
        /**
         * 封装表单信息
         * @ filename
         * @ file
         */
        let formData = new FormData();
        formData.append(p.filename, p.file);
        // fetch api
        /**
         * 包装请求体
         * @ action
         */
        const request = new Request(p.action, {
            method: "post",
            body: formData
        })
        const resq: IResponseData<string> | IResponseError = await fetch(request).then(resq => resq.json());
        if (resq.err) {
            message.error(resq.err);
        } else {
            if (this.props.onChange) {
                this.props.onChange(resq.data!)
            }
        }
    }

    render() {
        return (
            <div>
                <Upload
                    action="/api/upload"
                    name="imgfile"
                    accept=".jpg,.png,.gif"
                    listType="picture-card"
                    fileList={this.getFileList()}
                    customRequest={this.handleRequest.bind(this)}
                    onRemove={() =>{
                        if(this.props.onChange){
                            this.props.onChange("")
                        }}
                    }
                    onPreview={
                        () => {
                            this.setState({
                                showModal: true
                            })
                        }
                    }
                >
                    {this.getUploadContent()}
                </Upload>
                <Modal
                    visible={this.state.showModal}
                    title={this.props.value}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            showModal: false
                        })
                    }}
                >
                    <img alt="" style={{ width: '100%' }} src={this.props.value} />
                </Modal>
            </div>
        )
    }
}