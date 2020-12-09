import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router()

// 获取单个电影
// 方式
// - 1. localhost:3000/api/movie/xxxxxx  params方式
// - 2. lovalhost:3000/api/movie?id=xxxxxx  query方式
// 使用第一种方式
router.get("/:id",async (req,res)=>{
    try{
        const movieId = req.params.id;
        const movie = await MovieService.findById(movieId);
        // 响应:服务器的接口往往是一种标准形式
        ResponseHelper.sendData(movie,res);
        // bug3:params.id中的字符串不是mondoDB中的ObjectId字符串,会报错
    }catch{
        ResponseHelper.sendData(null,res);
    }
});

// 获取多个电影
router.get("/",async (req,res)=>{
    const result = await MovieService.find(req.query as any);
    ResponseHelper.sendPageData(result,res);
})

// 添加电影
// req.body需要解析,需要使用express中的json()中间件以及urlencoded()
router.post("/",async (req,res)=>{
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)){
        ResponseHelper.sendError(result,res);
    }else{
        ResponseHelper.sendData(result,res);
    }
});

// 修改电影
router.put("/:id",async (req,res)=>{
    try{
        const result = await MovieService.edit(req.params.id,req.body)
        if(result.length>0){
            ResponseHelper.sendError(result,res);
        }else{
            ResponseHelper.sendData(true,res);
        }
    }catch{
        ResponseHelper.sendError("params错误",res);
    }
});
router.delete("/",(req,res)=>{
    res.send("delete 请求")
});

export default router;