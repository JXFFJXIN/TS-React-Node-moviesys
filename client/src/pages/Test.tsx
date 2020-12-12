import React from "react"

interface MyProps {
    a:string //必选
    b:string //必选
}

class Test extends React.Component<MyProps>{
    /**
     * 设置默认React属性
     */
    static defaultProps:Pick<MyProps,"a"> = {
        a:"1212"
    }
}

class User extends React.Component {
    render(){
        return (
            <Test b="1212"/>
        )
    }
}