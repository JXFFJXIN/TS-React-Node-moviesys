import Mongoose from "mongoose";
import { User } from "../entities/User";

export interface IUser extends User,Mongoose.Document {}

const userSchema = new Mongoose.Schema<IUser>({
    loginId:String,
    loginPwd:String,
},{
    versionKey:false
})

export default Mongoose.model<IUser>("User",userSchema);
