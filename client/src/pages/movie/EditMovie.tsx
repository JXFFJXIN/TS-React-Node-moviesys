import React from "react";
import { RouteComponentProps } from "react-router";
import MovieForm from "../../components/MovieForm";
import { IMovie, MovieService } from "../../services/MovieService";

interface IParams {
    id:string
}

interface EditPageState {
    movie?:IMovie
}

/**
 * 获取地址栏中的params
 * @ 使用RouteComponentPropse<>泛型
 */
class edit extends React.Component<any,EditPageState>{
    state:EditPageState = {
        movie:undefined
    }

    async componentDidMount(){
        console.log(this.props);
        const result = await MovieService.getById(this.props.computedMatch.params.id)
        if(result.data){
            this.setState({
                movie:result.data
            })
        }
    }

    // id从this.props.match.params.id获取
    render(){
        return (
            <MovieForm 
            movie={this.state.movie}
            onSubmit={async (movie)=>{
                console.log(this.props)
                const req = await MovieService.edit(this.props.computedMatch.params.id,movie)
                if(req.err){
                    return req.err
                }
                return ""
            }}/>
        )
    }
}

export default edit; 