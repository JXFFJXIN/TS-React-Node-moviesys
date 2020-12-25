import "reflect-metadata";
import { BaseEntity } from "./BaseEntity";
import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class Book extends BaseEntity{
    // 书本名称
    @IsNotEmpty({message:"书名不能为空"})
    @Type(()=>String)
    public name:string;
    // 书本类型
    @IsNotEmpty({message:"书本类型不能为空"})
    @ArrayMinSize(1,{message:"书本类型至少有一个"})
    @Type(()=>String)
    @IsArray({message:"必须以数组的形式"})
    public types:string[];
    // 书本作者
    @IsNotEmpty({message:"作者不能为空"})
    @Type(()=>String)
    public author:string = "匿名";
    // 是否热销
    @IsNotEmpty({message:"是否热销不能为空"})
    @Type(()=>Boolean)
    public isHot:boolean = false;
    // 是否即将上架
    @IsNotEmpty({message:"是否即将上架不能为空"})
    @Type(()=>Boolean)
    public isComing:boolean = false;
    // 是否为经典书目
    @IsNotEmpty({message:"是否经典书目不能为空"})
    @Type(()=>Boolean)
    public isClassic:boolean = false;
    // 书本简介
    @Type(()=>String)
    public description?:string;
    // 书本封面
    @Type(()=>String)
    public poster?:string;
    // 平面对象转换为Book类
    public static transform(plainObject:object):Book{
        return super.baseTransform(Book,plainObject)
    }
}