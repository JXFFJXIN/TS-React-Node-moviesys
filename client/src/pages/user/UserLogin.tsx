import React from "react";
import { RouteComponentProps } from "react-router";
import UserForm from "../../components/UserForm";
import UserReducer from "../../redux/reducers/UserReducer";
import { UserService } from "../../services/UserService";

class login extends React.Component<RouteComponentProps<any>,any>{
    render(){
        return (
            <UserForm
                onSubmit={async (user)=>{
                    const req = await UserService.login(user.loginId,user.loginPwd);
                    if(req.err){
                        return req.err
                    }
                    return null
                }}
            />
        )
    }
}

export default login;