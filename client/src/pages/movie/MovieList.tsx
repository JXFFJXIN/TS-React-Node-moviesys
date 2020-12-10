import React, { Dispatch } from "react";
import MovieTable, { IMovieTableEvents} from "../../components/MovieTable";
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers/RootReducer";
import MovieAction from "../../redux/actions/MovieAction";
import { IMovieState } from "../../redux/reducers/MovieReducer";
import { SwitchType } from "../../services/CommonTypes";

/**
 * react-redux的使用 
 * 1. 定义一个函数，返回电影状态
 * @param state 仓库的状态
 */
function mapStateToProps(state:IRootState):IMovieState{
    return state.movie;
}

function mapDispatchToProps(dispatch:Dispatch<any>):IMovieTableEvents{
    return {
        onLoad(){
            dispatch(MovieAction.fetchMovie({
                page:1,
                limit:10,
                key:""
            }))
        },
        onSwitchChange(type, newState, id){
            dispatch(MovieAction.changeSwitch(type,newState,id))
        }
    }
}

/**
 * react-redux的使用
 * 2. HOC高阶函数
 * @ 由react-redux返回的高阶函数
 * @ 传入组件然后返回一个新的组件
 */
const HOC = connect(mapStateToProps,mapDispatchToProps);
/**
 * react-redux的使用
 * 3. 通过高阶函数HOC封装旧组件以及特定规则，然后返回新组件
 */
const MovieContainer = HOC(MovieTable);

class list extends React.Component {
    render(){
        return (
            <MovieContainer/>
        )
    }
}

export default list;

// 情形1 - 仓库里面有数据，但没有界面
// 情形2 - MovieTable组件有界面，但是没有数据
// 解决方法 - 使用react-redux库