import Express from "express";
import { UserService } from "../services/UserService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();
// 添加
router.post(
    "/add",
    async(req,res) => {
        const result = await UserService.add(req.body);
        if(Array.isArray(result)){
            ResponseHelper.sendError(result,res);
        }else{
            ResponseHelper.sendData(result,res);
        }
    }
)
// login登录
router.post(
    "/login",
    async(req,res)=>{
        const result = await UserService.login(req.body.loginId,req.body.loginPwd);
        if(!result){
            ResponseHelper.sendError("用户名或密码错误",res);
        }else{
            ResponseHelper.sendData(result,res);
        }
    }
)
// 查找
router.put(
    "/:id",
    async(req,res)=>{
        try{
            const result = await UserService.getUserById(req.params.id);
            ResponseHelper.sendData(result,res);
        }catch{
            ResponseHelper.sendError("params错误",res);
        }
    }
)
export default router