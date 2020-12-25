import axios from "axios";
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from "./CommonTypes";

export interface IBook {
    _id?:string;
    name:string;
    types:string[];
    author:string;
    isHot:boolean;
    isComing:boolean;
    isClassic:boolean;
    description?:string;
    poster?:string;
}

export class BookService {
    /**
     * 添加
     * @param book 书本数据
     */
    public static async add(book:IBook):Promise<IResponseData<IBook>|IResponseError>{
        const {data} = await axios.post("/api/book",book);
        return data
    }
    /**
     * 修改
     * @param id 书目id
     * @param book 书本修改数据
     */
    public static async edit(id:string,book:Partial<IBook>):Promise<IResponseData<true>|IResponseError>{
        const {data} = await axios.put(`/api/book/${id}`,book);
        return data;
    }
    /**
     * 删除
     * @param id 书目id
     */
    public static async delete(id:string):Promise<IResponseData<IBook>|IResponseError>{
        const {data} = await axios.delete(`/api/book/${id}`);
        return data;
    }
    /**
     * 根据id查询书目
     * @param id 书目id
     */
    public static async getById(id:string):Promise<IResponseData<IBook|null>>{
        const {data} = await axios.put(`/api/book/find/${id}`);
        return data;
    }
    /**
     * 根据条件查询书目
     * @param condition 查询条件
     */
    public static async getAll(condition:ISearchCondition):Promise<IResponsePageData<IBook>>{
        const {data} = await axios.put(`/api/book/find`,{
            params:condition,
        });
        return data;
    }
}