import Mongoose from "mongoose";
import { Book } from "../entities/Book";

export interface IBook extends Book,Mongoose.Document{}

const bookSchema = new Mongoose.Schema<IBook>({
    name:String,
    types:[String],
    author:String,
    isHot:Boolean,
    isComing:Boolean,
    isClassic:Boolean,
    description:String,
    poster:String,
},{
    versionKey:false
})

export default Mongoose.model<IBook>("Book",bookSchema);