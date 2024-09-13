const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./src/routes/route.js');
const session = require('express-session'); // Use express-session
const path = require('path');
const cookie = require('cookie-parser');
const RedisStore = require('connect-redis').default; // Newer version of connect-redis
const redis = require('redis');

app.set('view engine', 'ejs');
app.use(express.json());
app.use("/static", express.static('public'));
app.use("/static", express.static("upload"));
app.use(bodyparser.urlencoded({ extended: true }));

// Set trust proxy if needed
app.set('trust proxy', 1);

// Create a Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect(); // Use connect method if you're using the newer redis client version

app.use(session({
  store: new RedisStore({ client: redisClient }), // New RedisStore
  secret: 'gjiangkwenighwaigkwangiwhigwaigknwik',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Set this to true only if using HTTPS
    maxAge: 600000
  }
}));

app.use('/', router);

app.listen(9999, () => {
  console.log('★★★★★★ 9999 ★★★★★★');
});
