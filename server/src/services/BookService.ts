import { BookModel } from "../db";
import { IBook } from "../db/BookSchema";
import { Book } from "../entities/Book";
import { ISearchResult } from "../entities/CommonTypes";
import { SearchCondition } from "../entities/SearchCondition";

export class BookService{
    // 增加
    public static async add(book:Book):Promise<IBook|string[]>{
        book = Book.transform(book);
        const errors = await book.validateThis();
        if(errors.length>0){
            return errors;
        }
        return await BookModel.create(book);
    }
    // 修改
    public static async edit(id:string,book:Book):Promise<string[]>{
        // bug2:使用原来数据condition没有默认值,所以无法使用默认值
        // 解决方法:应该使用BookObj转换后的对象
        const bookObj = Book.transform(book);
        const errors = await bookObj.validateThis(true);
        if(errors.length>0){
            return errors;
        }
        await BookModel.updateOne({_id:id},book);
        return errors;
    }
    // 删除
    public static async delete(id:string):Promise<void>{
        await BookModel.deleteOne({_id:id});
    }
    // 查询
    public static async findById(id:string):Promise<IBook|null>{
        return await BookModel.findById(id);
    }
    // 条件查询
    public static async find(condition:SearchCondition):Promise<ISearchResult<IBook>>{
        condition = SearchCondition.transform(condition);
        const errors = await condition.validateThis(true);
        if(errors.length>0){
            return {
                count:0,
                data:[],
                errors
            }
        }
        const books = await BookModel.find({
            name:{$regex:new RegExp(condition.key)}
        }).skip(
            (condition.page-1)*condition.limit
        ).limit(
            condition.limit
        )
        const count = await BookModel.find({
            name:{$regex:new RegExp(condition.key)}
        }).countDocuments();
        return {
            count,
            data:books,
            errors:[]
        }
    }
}