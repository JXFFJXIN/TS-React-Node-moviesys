import axios from "axios";
import { IResponseData, IResponseError } from "./CommonTypes";

export interface IUser {
    _id?:string;
    loginId:string;
    loginPwd:string;
}

export class UserService {
    /**
     * 添加
     * @param user 用户数据
     */
    public static async add(user:IUser):Promise<IResponseData<IUser>|IResponseError>{
        const {data} = await axios.post("/api/user/add",user)
        return data;
    }
    /**
     * 登录
     * @param loginId 用户名
     * @param loginPwd 用户密码
     */
    public static async login(loginId:string,loginPwd:string):Promise<IResponseData<IUser>|IResponseError>{
        const {data} = await axios.post("/api/user/login",{loginId,loginPwd});
        console.log(data);
        return data;
    }
    /**
     * whoami
     * @param id 用户id
     */
    public static async whoami(id:string):Promise<IResponseData<IUser>|IResponseError>{
        const {data} = await axios.put(`api/user/${id}`);
        return data;
    }
}