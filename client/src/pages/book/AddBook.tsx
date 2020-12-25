import React from "react";
import BookForm from "../../components/BookForm";
import { BookService } from "../../services/BookService";

export default class add extends React.Component{
    render(){
        return (
            <BookForm
                onSubmit={
                    async (book)=>{
                        const req = await BookService.add(book)
                        if(req.err){
                            return req.err
                        }
                        return ""
                    }
                }
            />
        )
    }
}