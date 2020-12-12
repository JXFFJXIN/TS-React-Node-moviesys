import React from "react";
import MovieForm from "../../components/MovieForm";
import { MovieService } from "../../services/MovieService";

// eslint-disable-next-line react/display-name
export default class extends React.Component {
    render(){
        return (
            <MovieForm onSubmit={async (movie)=>{
                const req = await MovieService.add(movie)
                if(req.err){
                    return req.err
                }
                return ""
            }}/>
        )
    }
}