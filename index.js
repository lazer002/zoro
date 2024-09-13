const express = require('express')
const app = express()
const bodyparser = require('body-parser')

const router=  require('./src/routes/route.js')
// const session = require('express-session')
const session = require('cookie-session')
const path = require('path')
const cookie=require('cookie-parser')
app.set('view engine','ejs')
app.use(express.json())
app.use("/static",express.static('public'))
app.use("/static",express.static("upload"))
app.use(bodyparser.urlencoded({extended:true}))
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

app.set('trust proxy', 1);

const redisClient = redis.createClient();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'gjiangkwenighwaigkwangiwhigwaigknwik',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Set this to true only if using HTTPS
    maxAge: 600000
  }
}));





app.use('/',router)
app.listen(9999,()=>{
    console.log('★★★★★★ 9999 ★★★★★★')
})