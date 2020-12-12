// 添加上传图片的路由
import "reflect-metadata";
import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRoute from "./routes/UploadRoute";
import history from "connect-history-api-fallback"

const app = Express();

// 利用connect-history-api-fallback库将地址锚定在index.html上
app.use(history());

// 加载静态资源
app.use("/",Express.static("public/build"));
app.use("/upload",Express.static("public/upload"));

app.use(Express.json());// 该中间件用于解析请求消息体中的json格式数据
// 文件上传
// - 1.通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
// /api/upload
// - 2. 客户端会使用post请求，请求服务器
// content-type:multipart/form-data
// - 3. 服务器如何得到上传的文件
// 使用express的中间件multer

// 问题
// - 1. 如何设置上传的文件后缀名名（根据客户端的文件后缀名决定）
// - 2. 如何限制文件上传的大小（使用limits配置fileSize进行约束）
// - 3. 如何限制文件的后缀名（通过fileFilter配置文件的过滤）
// - 4. 如何在发生错误的时候响应给客户端，正确时又如何响应
// - 5. 如何将静态资源进行加载
app.use("/api/upload",UploadRoute);// 服务器文件上传路由
app.use("/api/movie",MovieRouter);// 服务器基本路由
app.listen(3000);