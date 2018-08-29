import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries/queries'

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
    render() {
        return(
            <div >
                <ul>
                  {this._displayBooks()}
                </ul>
            </div>
        )
    }
    _displayBooks() {
        var data = this.props.data;
        if (data.loading) {
            return (
                <div>Loading books........</div>
            )
        } else {
            return data.books.map((book, i) => <li onClick={() => this.setState({ selected: book.id})} key={i}>{book.name}</li>)
        }
    }
    
}
export default graphql(getBooksQuery)(BookList);