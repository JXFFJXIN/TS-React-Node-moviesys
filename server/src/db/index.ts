import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";
import UserModel from "./UserSchema";
import BookModel from "./BookSchema";
// Mongoose.connect 连接数据库
Mongoose.connect("mongodb://localhost:27017/moviedb",{
    useNewUrlParser:true
}).then(()=>console.log("连接数据库成功"));

export { 
    MovieModel,
    UserModel,
    BookModel
};// export导出变量不允许,需要使用大括号封装