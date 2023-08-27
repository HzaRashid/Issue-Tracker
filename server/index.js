const dotenv = require('dotenv').config();
var express = require('express');
var session = require('express-session');
var passport = require('passport');
require('./config/passport');
var morgan = require('morgan');
const mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
const ConnectMDB = require('./config/db');
const cors = require('cors'); 

ConnectMDB();

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
    cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: 'GET,POST,PUT'
}));


var store = new MongoDBStore(
    {
    uri: process.env.MDB_URI,
    databaseName: process.env.MDB_DB_NAME,
    collection: process.env.MDB_SESSION_COLLECTION,
    connectionOptions: {
      serverSelectionTimeoutMS: 10000
      }
},

  function(error) {
    if (error) {
      console.log('MDB new store Error:');
      console.log(error);
    }
  });

// Catch errors
store.on('error', (error) =>  { 
    console.log('MDB store.on Error:');
    console.log(error);
});


app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  }));


app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', require('./routes/Auth/Auth'))
app.use('/users', require('./routes/UserRoute'))
app.use('/issues', require('./routes/IssueRoute'))
app.use('/sprints', require('./routes/SprintRoute'))
app.use('/projects', require('./routes/ProjectRoute'))
app.use('/comments', require('./routes/CommentRoute'))



app.get('/is-authenticated', (req, res) => {console.log(req.user); res.send('aye');});

// const isAuthDemo = (req, res, next) => {
//   console.log(req?.isAuthenticated())
//     if (!req?.isAuthenticated() || req.user) {
//       return res?.status(450).json({
//         message: 'user not authenticated, nor authorized to make changes'
//       })
//     } next()
// }

// app.use(isAuthDemo)

const PORT = process.env.PORT || 4050;

app.listen(
    PORT, 
    () => console.log( `connected to http://localhost:${PORT}` )
    )
