import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addBookMutation, getBooksQuery } from '../../queries/queries'

class Field extends Component {
  render() {
    const { label } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input type='text' {...this.props} />
      </div>
    )
  }
}

class AddBook extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        genre: '',
        // authorId: null,
      }
  }
  render() {
    return (
      <div>
        <form onSubmit={this._submitForm}>
          <Field label='name' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
          <Field label='genre' value={this.state.genre} onChange={(e) => this.setState({genre: e.target.value})} />
          <button type='submit'>+</button>
        </form>
      </div>
    )
  }
  _submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: { ...this.state },
      refetchQueries: [{ query: getBooksQuery }]
    })
    this.setState({name: '', genre: ''})
  }
}

export default compose(
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook)
