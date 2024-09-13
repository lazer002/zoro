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
app.set('trust proxy', 1);

app.use(session({
cookie:{
    secure: true,
    maxAge:600000
       },
store: new RedisStore(),
secret: 'gjiangkwenighwaigkwangiwhigwaigknwik',
saveUninitialized: true,
resave: false
}));
 





app.use('/',router)
app.listen(9999,()=>{
    console.log('★★★★★★ 9999 ★★★★★★')
})