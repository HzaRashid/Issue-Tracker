const dotenv = require('dotenv').config();
var express = require('express');
var session = require('express-session');
var passport = require('passport');
require('./config/passportConfig.js');
var Redis = require('redis')
const SessionStore = require("connect-redis").default
const RedisStore = require('rate-limit-redis').default
const ConnectMDB = require('./config/db.js');
const cors = require('cors'); 
var compression = require('compression')

const { rateLimit } = require('express-rate-limit')

ConnectMDB();
const app = express();
app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))

if (process.env.NODE_ENV === "production") {
  var morgan = require('morgan');
  app.use(morgan('dev'))
}

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
  url: process.env.REDIS_URL
  // password: process.env.REDIS_PWD,
  // socket: {
  //     host: process.env.REDIS_HOST,
  //     port: process.env.REDIS_PORT
  // }
});

RedisClient.on('error', err => console.log('Redis Client Error', err));
RedisClient.connect()
RedisClient.ping('')

let redisStore = new SessionStore({
  client: RedisClient,
  prefix: "myapp:",
})


const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,     // 10 minutes
	max: 100,                     // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7',   // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: false,         // X-RateLimit-* headers
	store: new RedisStore({
    sendCommand: (...args) => RedisClient.sendCommand(args),
  }),
})
app.use(limiter)

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

if (process.env.NODE_ENV == "production") {
  var path = require('path');
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 4050;
app.listen(PORT, 
    () => console.log( `connected to http://localhost:${PORT}` ))
