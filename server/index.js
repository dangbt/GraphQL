const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/book');

require('./models/author');
require('./models/book');

mongoose.Promise = global.Promise;
const DBstring = 'mongodb://admin:admin123@ds225442.mlab.com:25442/learn-graphql';

mongoose.connect( DBstring, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log("connected database"));
mongoose.set('debug', true);

// require('./routes/memberRoute')(app);
// require('./routes/projectRoute')(app);
// app.get(/^((?!\/apii)(\/[a-z\-]*)*)*$/, (req, res) => {
//     res.sendFile('/index.html')
// });
// app.use(express.static(__dirname + '/public'))
// app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, staticPath, '/index.html')));

app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3001, () => console.log("Magic happens on port: " + 3001));
