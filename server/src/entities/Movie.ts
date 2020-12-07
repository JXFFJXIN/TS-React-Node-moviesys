import "reflect-metadata";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class Movie {
    // 电影名称
    @IsNotEmpty({message:"电影名称不可以为空"})
    @Type(()=>String)
    public name: string;
    // 电影类型
    @IsNotEmpty({message:"电影类型不能为空"})
    @ArrayMinSize(1,{message:"电影类型至少有一个"})
    @Type(()=>String)// 由于Array不能判断项中的类型，官方推荐之间按项内类型书写
    @IsArray({message:"必须以数组的形式"})// 当直接输入字符串也会通过验证，所以可以使用IsArray配合
    public types:string[];
    // 上映地区
    @IsNotEmpty({message:"上映地区不能为空"})
    @ArrayMinSize(1,{message:"上映地区至少有一个"})
    @Type(()=>String)
    @IsArray({message:"必须以数组的形式"})
    public areas:string[];
    // 电影时长
    @IsNotEmpty({message:"时长不可以为空"})
    @IsInt({message:"时长必须是整数"})
    @Min(1,{message:"时长最小1分钟"})
    @Max(99999,{message:"时长过长"})
    @Type(()=>Number)
    public timeLong:number;
    // 是否热映
    @IsNotEmpty({message:"热映布尔不能为空"})
    @Type(()=>Boolean)
    public isHot:boolean = false;
    // 是否即将上映
    @IsNotEmpty({message:"即将上映布尔不能为空"})
    @Type(()=>Boolean)
    public isComing:boolean = false;
    // 是否是经典影片
    @IsNotEmpty({message:"经典影片布尔不能为空"})
    @Type(()=>Boolean)
    public isClassic:boolean = false;
    // 电影简洁
    @Type(()=>String)
    public description?:string;
    // 电影海报
    @Type(()=>String)
    public poster?:string;
}