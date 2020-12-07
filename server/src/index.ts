import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Movie } from "./entities/Movie";

const m:any = {}; // plain Object
m.name = "星链舰队";
m.types = ["星云情感","太空喜剧"];
m.areas = ["地球共和星","月亮前哨战"];
m.isClassic = true;
m.isHot = true;
m.timeLong = 150;

// 将plain Object转换为Movie的对象
const movie = plainToClass(Movie,m as object);

// console.log(movie,typeof m.name);
// 检验Movie实例对象
validate(movie).then(errors=>{
    console.log(errors)
});