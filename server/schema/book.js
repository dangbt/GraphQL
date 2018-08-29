const graphql = require("graphql");
const Book = require('../models/book');
const Author = require('../models/author');
const mongoose = require('mongoose')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const bookData = [
  { name: "name1", gerne: "gerne1", _id: new mongoose.Types.ObjectId(), },
  { name: "name2", gerne: "gerne2", _id: new mongoose.Types.ObjectId(), },
];  
const authorData = [
  { name: "authorName1", age: 1, _id: new mongoose.Types.ObjectId(),},
  { name: "authorName2", age: 2, _id: new mongoose.Types.ObjectId() }
]

// bookData.forEach((book) => {
//   const newBook = new Book(book);
//   newBook.save();
// })

// authorData.forEach((author) => {
//   const newAuthor = new Author(author);
//   newAuthor.save();
// })

//buoc 1 tao schema
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // author: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     return Author.findById(parent.authorId);
    //   }
    // }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id })
      }
    }
  })
});


// buoc 2: tao api
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Book.findOne({ id: args.id});
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author.findById({ _id: args._id });
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString)},
        genre: { type: GraphQLNonNull(GraphQLString)},
        // authorId: { type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          // authorId: args.authorId
        })
        return book.save();
      },
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})