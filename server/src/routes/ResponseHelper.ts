import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

// 限制服务器响应的格式
export class ResponseHelper {
    // 响应错误
    public static sendError(error:string|string[],res:Response){
        let err:string;
        if(Array.isArray(error)){
            err = error.join(";");
        }else{
            err = error;
        }
        res.send({
            err,
            data:null
        })
    }
    // 响应普通数据
    public static sendData(data:any,res:Response){
        res.send({
            err:"",
            data
        })
    }
    // 响应分页数据
    public static sendPageData<T>(result:ISearchResult<T>,res:Response){
        if(result.errors.length>0){
            // 有错误
            this.sendError(result.errors,res);
        }else{
            res.send({
                err:"",
                data:result.data,
                total:result.count
            })
        }
    }
}
