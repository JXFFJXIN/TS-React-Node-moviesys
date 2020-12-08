// 导入mongoose
import Mongoose from "mongoose";// 不允许默认导出可以使用tsconfig中的esModuleInterop来配置
import { Movie } from "../entities/Movie";
// 利用一个继承Movie类以及Mongoose.Document的接口来实现Mongoose.Schema的类型检查
// 编写代码中的类型检查
export interface IMovie extends Movie,Mongoose.Document {}

const movieSchema = new Mongoose.Schema<IMovie>({// 定义模型数据类型
    // 运行中的类型检查
    name: String,
    types: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    description: String,
    poster: String
}, {// 其他配置
    versionKey: false// 不自动产生版本号
})

// 利用Mongoose.model导出模型名字以及模型配置movieSchema
export default Mongoose.model<IMovie>("Movie",movieSchema);

// 为了TS的类型检查特意添加了IMovie接口,以及在Mongoose.model和Mongoose.Schema使用泛型<IMovie>