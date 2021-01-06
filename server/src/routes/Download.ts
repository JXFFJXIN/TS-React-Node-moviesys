// 下载文件的路由
import express, { Router } from "express";
import path from "path";

const router:Router = express.Router();
router.get(
    "/:filename",
    (req,res)=>{
        const absPath = path.resolve(__dirname,"../../public/upload",req.params.filename);
        res.download(absPath,req.params.filename);
    }
)

export default router;