import React, { Dispatch } from "react";
import { RouteComponentProps } from "react-router";
import UserForm from "../../components/UserForm";
import UserReducer, { IUserState } from "../../redux/reducers/UserReducer";
import UserAction from "../../redux/actions/UserAction"
import { IRootState } from "../../redux/reducers/RootReducer";
import { IUser } from "../../services/UserService";
import { connect } from "react-redux";

function mapStateToProps(state:IRootState):IUserState{
    return state.user;
}
function mapDispatchToProps(dispatch:Dispatch<any>,pro:any):any{
    return {
        async onSubmit(user:IUser){
            await dispatch(UserAction.loginAction(user.loginId,user.loginPwd))
            return null
        }
    }
}

const HOC = connect(mapStateToProps,mapDispatchToProps);

const UserFormStore:any = HOC(UserForm);

class login extends React.Component<RouteComponentProps<any>,any>{
    render(){
        const pushState = this.props;
        return (
            <UserFormStore
            pushState={pushState}
            // propsHistory={pushHistory}
                // onSubmit={async (user)=>{
                //     await UserAction.loginAction(user.loginId, user.loginPwd);
                //     const pushState:string = this.props.location.state as any;
                //     if(pushState){
                //         console.log(pushState);
                //         this.props.history.push(pushState)
                //     }else{
                //         this.props.history.push("/")
                //     }
                //     return null
                // }}
            />
        )
    }
}

export default login;