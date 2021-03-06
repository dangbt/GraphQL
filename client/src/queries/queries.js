import {
  gql
} from 'apollo-boost';

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

export const getBookQuery = gql `
  query($id: ID) {
    book(_id: $id) {
      _id
      name,
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!,
  #  $authorId: ID!
  ) {
    addBook(name: $name, genre: $genre, 
    # authorId: $authorId
    ) {
      name
      id
    }
  }
`