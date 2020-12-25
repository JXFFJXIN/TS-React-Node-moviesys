import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import "reflect-metadata";
import { BaseEntity } from "./BaseEntity";
import md5 from "md5";

export class User extends BaseEntity{
    @IsNotEmpty({message:"用户名不能为控"})
    @Type(()=>String)
    public loginId:string;

    @IsNotEmpty({message:"密码不能为空"})
    @Type(()=>String)
    public loginPwd:string;

    public static transform(plainObject:object):User{
        return super.baseTransform(User,plainObject)
    }

    public static encryption(loginPwd:string):string{
        return md5(loginPwd)
    }
}