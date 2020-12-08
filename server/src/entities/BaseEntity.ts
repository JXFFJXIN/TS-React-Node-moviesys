import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { validate } from "class-validator";

export abstract class BaseEntity{
    // >>>>>由于在定义添加和删除方法时需要对该实体类进行预操作,所以在该类定义相关预操作<<<<<
    // 验证当前电影对象
    public async validateThis(skipMissing = false):Promise<string[]>{
        const errors = await validate(this,{
            skipUndefinedProperties:skipMissing
        });
        // errors:[{constraints:{"错误类型A":"错误信息A"}},{constraints:{"错误类型B":"错误信息B"}}]
        const temp = errors.map(e => Object.values(e.constraints!))
        // temp:[["错误信息A","错误信息B"]]
        const result:string[] = [];
        temp.forEach(r=>{
            result.push(...r);
        });
        return result;
    }
    // plainObject转换为class
    // 静态函数,使用泛型来接触耦合
    // 当需要使用T作为变量时,就需要将类传入,并且传入类的类型为ClassType<T>
    // 为了利于使用,可以将静态函数变为protected函数
    protected static baseTransform<T>(cls:ClassType<T>,plainObject:object):T{
        if(plainObject instanceof cls){
            return plainObject;
        }
        return plainToClass(cls,plainObject);
    }
}