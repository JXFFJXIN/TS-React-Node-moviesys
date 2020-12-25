import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Space } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IUserState } from '../redux/reducers/UserReducer';
import { IUser } from '../services/UserService';

export interface IUserProp extends RouteComponentProps{
    onSubmit:(user:IUser)=>Promise<any>
    user?:IUser
}

const layout = {
    labelCol:{
        span:5
    },
    wrapperCol:{
        span:19,
    }
}

const tailLayout = {
    wrapperCol:{
        offset:5,
        span:19
    }
}

class UserForm extends React.Component<IUserProp,any>{

    
    render(){
        const onFinish = async (value:IUser) => {
            if(value){
                const res = await this.props.onSubmit(value);
                if(!res){
                    message.success("提交成功",1,()=>{
                        this.props.history.push("/")
                    })
                }else{
                    message.error(res);
                }
            }
        }
        return (
            <Form
                onFinish={onFinish}
                {...layout}
                style={{width:"400px",padding:"1em"}}
            >
                <Form.Item
                    label="用户"
                    name="loginId"
                    rules={[{
                        required:true,
                        message:"用户名不能为空"
                    }]}
                >
                    <Input
                        placeholder="default size" 
                        prefix={<UserOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="loginPwd"
                    rules={[{
                        required:true,
                        message:"密码不能为空"
                    }]}
                >
                    <Space direction="vertical">
                        <Input.Password
                        placeholder="input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Space>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(UserForm);