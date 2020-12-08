import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import { ISearchResult } from "../entities/CommonTypes";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

export class MovieService{
    // 增加
    public static async add(movie:Movie):Promise<IMovie|string[]>{
        // 1. 转换类型
        // 2. 数据验证
// >>>>>>>1./2. 两步是关于实体Movie的操作,所以可以在实体中定义<<<<
        movie = Movie.transform(movie);
        const errors = await movie.validateThis();
        if(errors.length>0){
            return errors;
        }
        // 3. 添加到数据库
        return await MovieModel.create(movie);
    }
    // 修改
    public static async edit(id:string,movie:Movie):Promise<string[]>{
        // 1./2.转换和检验数据库
        const movieObj = Movie.transform(movie);
        const errors = await movieObj.validateThis(true);
        if(errors.length>0){
            return errors;
        }
        // 3. 修改数据库
        await MovieModel.updateOne({_id:id},movie);
        return errors;
    }
    // 删除
    public static async delete(id:string):Promise<void>{
       await MovieModel.deleteOne({_id:id});
    }
    // 查询
    public static async findById(id:string):Promise<Movie|null>{
        return await MovieModel.findById(id)
    }
    // 条件查询
    public static async find(condition:SearchCondition):Promise<ISearchResult<IMovie>>{
        // bug2:使用原来数据condition没有默认值,所以无法使用默认值
        // 解决方法:应该使用valiObj转换后的对象
        // 1. 转换类型
        const valiObj = SearchCondition.transform(condition);
        // 2. 数据验证
        const errors = await valiObj.validateThis(true);
        if(errors.length>0){
            return {
                count:0,
                data:[],
                errors
            };
        }
        // 3. 查找
        const movies = await MovieModel.find({
            // mongo模糊查询设置
            name:{$regex: new RegExp(valiObj.key)}
        }).skip(
            // 跳过几条数据
            (valiObj.page - 1)*valiObj.limit
        ).limit(
            // 取几条数据
            valiObj.limit
        )
        // 电影数量
        const count = await MovieModel.find({
            name:{$regex:new RegExp(valiObj.key)}
        }).countDocuments();
        return {
            count,
            data:movies,
            errors:[]
        };
    }
}