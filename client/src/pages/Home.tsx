import React from "react";
import Uploader from "../components/imgUploader"
// eslint-disable-next-line react/display-name
export default class extends React.Component {

    // state = {
    //     img:""
    // }

    render(){
        return (
            <h1>
                欢迎使用电影管理系统
            </h1>
            // <Uploader 
            // curImgUrl={this.state.img}
            // onChange={newUrl =>{
            //     this.setState({
            //         img:newUrl
            //     })
            // }}
            // />
        )
    }
}