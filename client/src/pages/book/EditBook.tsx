import React from 'react';
import { RouteComponentProps } from 'react-router';
import BookForm from '../../components/BookForm';
import { BookService, IBook } from '../../services/BookService';

interface IParams {
    id:string
}

interface EditPageState {
    book?:IBook
}

class edit extends React.Component<any,EditPageState>{
    state:EditPageState={
        book:undefined
    }

    async componentDidMount(){
        const result = await BookService.getById(this.props.computedMatch.params.id);
        if(result.data){
            this.setState({
                book:result.data
            })
        }
    }

    render(){
        return (
            <BookForm
                book={this.state.book}
                onSubmit={async (book)=>{
                    const req = await BookService.edit(this.props.match.params.id,book);
                    if(req.err){
                        return req.err
                    }
                    return ""
                }}
            />
        )
    }
}

export default edit;