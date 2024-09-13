const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./src/routes/route.js');
const session = require('express-session'); 
const path = require('path');
const cookie = require('cookie-parser');
const MemoryStore = require('memorystore')(session)
const redis = require('redis');

app.set('view engine', 'ejs');
app.use(express.json());
app.use("/static", express.static('public'));
app.use("/static", express.static("upload"));
app.use(bodyparser.urlencoded({ extended: true }));


app.set('trust proxy', 1);


app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 864000
    }),
    resave: false,
    secret: 'keyboard cat'
}))

app.use('/', router);

app.listen(9999, () => {
  console.log('★★★★★★ 9999 ★★★★★★');
});
