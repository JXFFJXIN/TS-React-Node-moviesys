// 上传文件的路由
// 使用multer中间件
import multer from "multer";
import Express from "express";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

// 配置multer磁盘存储
const storage = multer.diskStorage({
    destination :path.resolve(__dirname, "../../public/upload"),
    filename (req, file, cb) {
        // 文件名是什么
        const time = new Date().getTime();
        // 后缀名是什么
        const extname = path.extname(file.originalname);
        // 设置文件的全称
        cb(null,`${time}${extname}`)
    }
})

// 配置multer对象，配置文件保存的目录,使用磁盘存储
const allowExt = [".jpg",".png",".gif",".bmp"]
const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024, // 文件最多1M
    },
    fileFilter(req,file,cb){
        // cb(null,true) 允许上传
        // cb(null,false) 不允许上传
        const ext = path.extname(file.originalname);
        if(allowExt.includes(ext)){
            cb(null,true);
        }else{
            // cb(null,false)会直接忽略且不保存
            // 使用cb(new Error("错误信息"))会返回错误信息
            cb(new Error("文件后缀不符合要求"));
        }
    }
}).single('imgfile');
// 使用upload中的方法single并配置约定键名imgfile
router.post("/",  (req, res) => {
    upload(req,res,err=>{
        if(err){
            ResponseHelper.sendError(err.message,res);
        }else{
            const url = `/upload/${req.file.filename}`;
            ResponseHelper.sendData(url,res)
        }
    })
})
export default router;