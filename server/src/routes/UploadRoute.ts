// 上传文件的路由
// 使用multer中间件
import multer from "multer";
import Express from "express";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";
import jimp from "jimp"; // 使用jimp添加水印
const router = Express.Router();

// 给一张图片加水印
async function mark(
    waterFile:string,// 水印图片
    originFile:string,// 原始图片
    targetFile:string,// 目标图片
    proportion:number = 5,// 水印图片和原始图片的比例
    marginProportion:number = 0.01// 水印距离原始图片在右边的距离
):Promise<any>{
    // 1. 使用jimp解析水印图片和源图片
    const [water,origin] = await Promise.all([
        jimp.read(waterFile),
        jimp.read(originFile)
    ]);
    // 2. 对水印图片进行缩放
    //  属性：bitmap位图属性
    const curProportion = origin.bitmap.width/water.bitmap.width; // 获取原始比例
    // 3. 使用scale()方法进行缩放，当前比例/目标比例 进行缩放
    water.scale(curProportion/proportion);
    // 4. 计算水印位置
    const right = origin.bitmap.width*marginProportion;
    const bottom = origin.bitmap.height*marginProportion;
    const x = origin.bitmap.width - right - water.bitmap.width;
    const y = origin.bitmap.height - bottom - water.bitmap.height;
    // 5. 写入水印，利用composite覆盖方法
    //  第一参数，覆盖的图片
    //  第二参数，x轴位置
    //  第三参数，y轴位置
    //  第四参数，options{mode模式，目标透明度，源透明度}
    origin.composite(water,x,y,{
        mode:jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.3,
        opacityDest:1
    })
    // 6. 保存，利用write（）方法
    origin.write(targetFile);
}

// 配置multer磁盘存储
const storage = multer.diskStorage({
    // 目标文件夹配置
    destination(req,file,cb){
        cb(null,path.resolve(__dirname, "../../public/upload"))
    },
    // 文件名
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
    // 文件会存放在dest中指定的目录，但是没有后缀名
    // dest：path.resolve(__dirname,"../../public","upload");

    // 磁盘存储引擎
    storage,
    // 文件限制
    limits:{
        fileSize:150*1024*1024, // 文件最多1M
    },
    // 检验文件后缀名
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

// 水印图片的路径
const waterPath = path.resolve(__dirname,"../../public/img/water.png")
router.post("/",  (req, res) => {
    upload(req,res,async err=>{
        if(err){
            ResponseHelper.sendError(err.message,res);
        }else{
            // 响应客户端
            const url = `/upload/${req.file.filename}`;
            // 加水印
            // 新的路径
            const newPath = path.resolve(__dirname,"../../public/upload",req.file.filename);
            // req.file.path -- 原始图片的绝对路径
            await mark(waterPath,req.file.path,newPath);
            ResponseHelper.sendData(url,res)
        }
    })
})
export default router;