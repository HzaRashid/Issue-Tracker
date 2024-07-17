const dotenv = require('dotenv').config();
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var passportConfig = require('./config/passportConfig.js');
const ConnectMDB = require('./config/db.js');
const { RedisClient } = require('./config/redisClient.js')
const sessionStore = require("connect-redis").default
const { rateLimit } = require('express-rate-limit')
const limitStore = require('rate-limit-redis').default
var compression = require('compression')
const cors = require('cors'); 


ConnectMDB(); 

const app = express(); // foo ?
app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))

if (process.env.NODE_ENV == "development") {
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
    methods: 'GET,POST,PUT,OPTIONS',
}));

let redisStore = new sessionStore({
  client: RedisClient,
  prefix: "myapp:",
})

if (process.env.NODE_ENV == 'production') {
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,     // 10 minutes
    max: 500,                     // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    standardHeaders: 'draft-7',   // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
    legacyHeaders: false,         // X-RateLimit-* headers
    store: new limitStore({
      sendCommand: (...args) => RedisClient.sendCommand(args),
    })})
    // limiter.on('connection', () => console.log('rate-limiter on'))
    app.use(limiter)
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: false,
      secure: true,
      sameSite: 'none'
    },
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secureProxy: true,
    proxy: true,
    
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

const PORT = process.env.PORT || 3000;
app.listen(PORT,
    () => console.log( `connected to http://localhost:${PORT}` ))
