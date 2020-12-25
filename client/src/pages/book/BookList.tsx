import React, { Dispatch } from "react";
import { connect } from "react-redux";
import BookTable, { IBookTableEvents } from "../../components/BookTable";
import BookAction from "../../redux/actions/BookAction";
import { IBookState } from "../../redux/reducers/BookReducer";
import { IRootState } from "../../redux/reducers/RootReducer";

function mapStateToProps(state:IRootState):IBookState{
    return state.book
}
function mapDispatchToProps(dispatch:Dispatch<any>):IBookTableEvents{
    return {
        onLoad(){
            console.log('222')
            dispatch(BookAction.fetchBook({
                page:1,
                limit:10,
                key:""
            }))
        },
        onSwitchChange(type,newState,id){
            dispatch(BookAction.changeSwitch(type,newState,id))
        },
        async onDelete(id){
            dispatch(BookAction.deleteBook(id))
        },
        onChange(page){
            dispatch(BookAction.fetchBook({
                page,
            }))
        },
        onKeyChange(key){
            dispatch(BookAction.setConditionAction({
                key,
            }))
        },
        onSearch(){
            dispatch(BookAction.fetchBook({
                page:1
            }))
        }
    }
}
const HOC = connect(mapStateToProps,mapDispatchToProps);

const BookContatiner = HOC(BookTable)

class list extends React.Component{
    render(){
        return (
            <BookContatiner/>
        )
    }
}
export default list;