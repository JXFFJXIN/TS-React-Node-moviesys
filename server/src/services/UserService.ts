import { UserModel } from "../db";
import { IUser } from "../db/UserSchema";
import { User } from "../entities/User";

export class UserService{
    // 增加
    public static async add(userObj:User):Promise<IUser|string[]>{
        if(userObj.loginPwd){
            userObj.loginPwd = User.encryption(userObj.loginPwd);
        }
        userObj = User.transform(userObj)
        const errors = await userObj.validateThis();
        if(errors.length>0){
            return errors;
        }
        const ins = await UserModel.create(userObj);
        return ins;
    }

    // 删除
    public static async delete(id:string):Promise<void>{
        const result = await UserModel.deleteOne({_id:id});
        return result;
    }

    // 更新
    public static async update(id:string,userObj:User):Promise<string[]>{
        if(userObj.loginPwd){
            userObj.loginPwd = User.encryption(userObj.loginPwd);
        }
        const errors = await userObj.validateThis();
        if(errors.length>0){
            return errors;
        }
        userObj = User.transform(userObj);
        await UserModel.updateOne({_id:id},userObj);
        return errors;
    }

    // 登录
    public static async login (loginId:string,loginPwd:string):Promise<object|null>{
        if(loginPwd){
            loginPwd = User.encryption(loginPwd);
        }
        const result = await UserModel.findOne({
            loginId,
            loginPwd
        })
        if(result&&result.loginId === loginId){
            return result.toJSON();
        }
        return null
    }
    // 查找
    public static async getUserById(id:string):Promise<object|null>{
        const result = await UserModel.findOne({_id:id});
        if(result){
            return result.toJSON();
        }
        return null
    }
}