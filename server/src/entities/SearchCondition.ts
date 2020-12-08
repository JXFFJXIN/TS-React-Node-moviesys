import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity {
    // 页码,从1开始
    @IsInt({message:"页码必须是整数"})
    @Min(1,{message:"页码最小值为1"})
    @Type(()=>Number)
    public page:number = 1;

    // 页容量(每页的记录数)
    @IsInt({message:"页容量必须是整数"})
    @Min(1,{message:"页容量最小值为1"})
    @Type(()=>Number)
    public limit:number = 10;

    // 关键字查询
    @Type(()=>String)
    public key: string = "";

    // 父类baseTranform则子类使用super进行使用
    public static transform(plainObject:object):SearchCondition{
        return super.baseTransform(SearchCondition,plainObject);
    }
}