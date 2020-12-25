import { Button, Checkbox, Form, Input, message, Switch } from "antd";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { IBook } from "../services/BookService";
import ImgUploader from "./imgUploader";

interface IFormProp extends RouteComponentProps {
    onSubmit:(book:IBook)=>Promise<string>
    book?:IBook
}
// 默认样式
const layout = {
    labelCol:{span:5},
    wrapperCol:{
        span:19,
    },
};
const tailLayout = {
    wrapperCol:{
        offset:5,
        span:19
    }
}

class BookForm extends React.Component<IFormProp>{
    render(){
        const onFinish = async (value:IBook) => {
            if(value){
                const result = await this.props.onSubmit(value)
                if(result){
                    message.error(result);
                }else{
                    message.success("提交成功",1,()=>{
                        this.props.history.push("/book");
                    })
                }
            }
        }

        const normFile = (e:any) =>{
            return e;
        }

        const fields = [];
        if(this.props.book){
            const arrKey = Object.entries(this.props.book)
            for(let i = 0 , len = arrKey.length ; i < len ; i ++){
                const ato = {
                    name:arrKey[i][0],
                    value:arrKey[i][1]
                }
                fields.push(ato);
            }
        }
        const typeOptions:string[] = ['历史','科幻','纪实','传记','小说','散文','儿童读物']
        return (
            <Form
                onFinish={onFinish}
                {...layout}
                style={{width:"400px",padding:"1em"}}
                fields={fields}
            >
                <Form.Item
                    label="书目名称"
                    name="name"
                    rules={[{
                        required:true,
                        message:"书目名称不能为空"
                    }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="封面"
                    name="poster"
                    getValueFromEvent={normFile} 
                    noStyle
                >
                    <ImgUploader/>
                </Form.Item>
                <Form.Item
                    label="书目类型"
                    name="types"
                    rules={[{
                        required:true,
                        message:"请选择书目类型"
                    }]}
                >
                    <Checkbox.Group
                        options={typeOptions}
                    />
                </Form.Item>
                <Form.Item
                    label="正在热销"
                    name="isHot"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch/>
                </Form.Item>
                <Form.Item
                    label="即将上架"
                    name="isComing"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch/>
                </Form.Item>
                <Form.Item
                    label="经典书目"
                    name="isClassic"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch/>
                </Form.Item>
                <Form.Item
                    label="书目描述"
                    name="description"
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(BookForm);
