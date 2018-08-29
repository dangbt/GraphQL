import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div >
          <h1>Book List</h1>
          <AddBook />
          <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
