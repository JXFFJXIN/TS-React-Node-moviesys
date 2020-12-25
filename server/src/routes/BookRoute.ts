import express from "express";
import { BookService } from "../services/BookService";
import { ResponseHelper } from "./ResponseHelper";

const router = express.Router();
// id查找
router.put(
    "/find/:id",
    async (req,res)=>{
        try{
            const book = await BookService.findById(req.params.id);
            ResponseHelper.sendData(book,res);
        }catch{
            ResponseHelper.sendError("params错误",res);
        }
    }
)
// 查找所有
router.put(
    "/find",
    async (req,res)=>{
        const result = await BookService.find(req.query as any);
        ResponseHelper.sendPageData(result,res);
    }
)
// 添加记录
router.post(
    "/",
    async (req,res)=>{
        const result = await BookService.add(req.body);
        if(Array.isArray(result)){
            ResponseHelper.sendError(result,res);
        }else{
            ResponseHelper.sendData(result,res);
        }
    }
)
// 修改记录
router.put(
    "/:id",
    async (req,res)=>{
        try{
            const result = await BookService.edit(req.params.id,req.body);
            if(result.length>0){
                ResponseHelper.sendError(result,res);
            }else{
                ResponseHelper.sendData(true,res);
            }
        }catch{
            ResponseHelper.sendError("params错误",res);
        }
    }
)
// 删除记录
router.delete(
    "/:id",
    async (req,res)=>{
        try{
            await BookService.delete(req.params.id);
            ResponseHelper.sendData("true",res);
        }catch{
            ResponseHelper.sendError("params错误",res);
        }
    }
)

export default router;