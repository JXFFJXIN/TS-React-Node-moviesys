import axios from "axios"
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from "./CommonTypes";

export interface IMovie {
    // 与服务器有相似对的类型声明可以使用webpack来处理
    _id?:string;
    name:string;
    types:string[];
    areas:string[];
    timeLong:number;
    isHot:boolean;
    isComing:boolean;
    isClassic:boolean;
    description?:string;
    poster?:string;
}

export class MovieService {
    // ajax-添加
    public static async add(movie:IMovie):Promise<IResponseData<IMovie>|IResponseError>{
        // 客户端：3001，服务端：3000
        // 需要完整的请求路径，可以使用代理
        // package.json中的“proxy”配置
        const {data} = await axios.post("/api/movie",movie)
        return data;
    }
    // ajax-修改
    public static async edit(id:string,movie:Partial<IMovie>):Promise<IResponseData<true>|IResponseError>{
        const {data} = await axios.put(`/api/movie/${id}`,movie);
        return data;
    }
    // ajax-删除
    public static async delete(id:string):Promise<IResponseData<true>|IResponseError>{
        const {data} = await axios.delete(`/api/movie/${id}`);
        return data;
    }
    // ajax-查找一个
    public static async getById(id:string):Promise<IResponseData<IMovie|null>>{
        const {data} = await axios.get(`/api/movie/${id}`);
        return data;
    }
    // ajax-查找多个
    public static async get(condition:ISearchCondition):Promise<IResponsePageData<IMovie>>{
        const {data} = await axios.get(`/api/movie/`,{
            params:condition,
        });
        return data;
    }
}