const dotenv = require('dotenv').config();
var express = require('express');
var session = require('express-session');
var passport = require('passport');
require('./passportConfig.js');
var Redis = require('redis')
const RedisStore = require("connect-redis").default
const ConnectMDB = require('./db.js');
const cors = require('cors'); 
var compression = require('compression')
var morgan = require('morgan');

ConnectMDB();
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(compression())

app.use(express.urlencoded({ extended: false }))

app.use(
    cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: 'GET,POST,PUT',
}));


const RedisClient = Redis.createClient({
  password: process.env.REDIS_PWD,
  socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
  }
});

RedisClient.on('error', err => console.log('Redis Client Error', err));
RedisClient.connect()
RedisClient.ping('')

let redisStore = new RedisStore({
  client: RedisClient,
  prefix: "myapp:",
})

app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: false
    },
    store: redisStore,
    resave: false,
    saveUninitialized: false,
  }));



app.use(passport.initialize())
app.use(passport.session())



app.use('/auth', require('./routes/Auth/Auth'))
app.use('/users', require('./routes/UserRoute.js'))
app.use('/issues', require('./routes/IssueRoute'))
app.use('/sprints', require('./routes/SprintRoute'))
app.use('/projects', require('./routes/ProjectRoute'))
app.use('/comments', require('./routes/CommentRoute'))


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'build')));
//   app.get('/*', function (req, res) {
//      res.sendFile(path.join(__dirname, 'build', 'index.html'));
//    });
// }
const PORT = process.env.PORT || 4050;
app.listen(PORT, 
    () => console.log( `connected to http://localhost:${PORT}` ))
