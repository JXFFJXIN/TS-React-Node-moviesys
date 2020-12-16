import { Movie } from "./entities/Movie";
import { MovieService } from "./services/MovieService";

const m:any = {
    // bug1:当重新赋值时,进行转换会将默认值再次执行,所以第一次isHot为true,第二次不写则为false
    // 解决方法1: 不使用默认值
    // 解决方法2: MovieModule.edit()使用原始对象movie而不进行覆写
    name:"宝宝金水",
    timeLong:200,
    areas:["中国"],
    isHot:true,
    types:["喜剧"],
}

MovieService.findById("5fcf2e6b8ece5c32bc9d8aec").then(r=>{
    console.log("查询:"+r);
})