import { Button, Checkbox, Form, Input, InputNumber, message, Switch } from "antd";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { IMovie } from "../services/MovieService";
import ImgUploader from "./imgUploader";

interface IFormProp extends RouteComponentProps {
    onSubmit: (movie: IMovie) => Promise<string>
    movie?: IMovie
}

const layout = {
    labelCol: { span: 5 },
    wrapperCol: {
        span: 19,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 19
    }
}

class MovieForm extends React.Component<IFormProp> {

    render() {
        const onFinish = async (value: IMovie) => {
            if (value) {
                const result = await this.props.onSubmit(value);
                if (result) {
                    message.error(result);
                } else {
                    message.success("提交成功", 1, () => {
                        // 1000ms后跳转页面
                        this.props.history.push("/movie")
                    })
                }
            }
        }
        const normFile = (e: any) => {
            return e
        };
        const fields = [];
        if(this.props.movie){
            const arrKey = Object.keys(this.props.movie);
            const arrValue = Object.values(this.props.movie);
            for(let i = 0 ; i < arrKey.length ; i++){
                const ato = {
                    name:arrKey[i],
                    value:arrValue[i]
                }
                fields.push(ato);
            }
            console.log(arrKey,arrValue,fields);
        }
        const areasOptions: string[] = ['中国大陆', '美国', '日本', '韩国'];
        const typeOptions: string[] = ['喜剧', '悲剧', '合家欢', '战争', '科幻', '惊悚'];
        return (
            <Form
                onFinish={onFinish}
                {...layout}
                style={{ width: "400px", padding: "1em" }}
                fields={fields}
            >
                <Form.Item
                    label="电影名称"
                    name="name"
                    rules={[{
                        required: true,
                        message: "电影名称不能为空"
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="封面"
                    name="poster"
                    getValueFromEvent={normFile} noStyle
                >
                    <ImgUploader />
                </Form.Item>
                <Form.Item
                    label="发行地区"
                    name="areas"
                    rules={[{
                        required: true,
                        message: "请选择地区"
                    }]}
                >
                    <Checkbox.Group
                        options={areasOptions}
                    />
                </Form.Item>
                <Form.Item
                    label="影片类型"
                    name="types"
                    rules={[{
                        required: true,
                        message: "请选择电影类型"
                    }]}
                >
                    <Checkbox.Group
                        options={typeOptions}
                    />
                </Form.Item>
                <Form.Item
                    label="时长"
                    name="timeLong"
                    initialValue={120}
                    rules={[{
                        required: true,
                        message: "请填写时长"
                    }]}
                >
                    <InputNumber
                        min={30}
                        max={240}
                        step={10}
                    />
                </Form.Item>
                <Form.Item
                    label="正在热映"
                    name="isHot"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch
                    />
                </Form.Item>
                <Form.Item
                    label="即将上映"
                    name="isComing"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch
                    />
                </Form.Item>
                <Form.Item
                    label="经典影片"
                    valuePropName="checked"
                    name="isClassic"
                    initialValue={false}
                >
                    <Switch
                    />
                </Form.Item>
                <Form.Item
                    label="影片描述"
                    name="description"
                >
                    <Input.TextArea rows={4} />
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



export default withRouter(MovieForm);