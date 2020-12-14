require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive')
const session = require('express-session');
const AC = require('./controllers/authController');

// process.env.SERVER_PORT
const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;

app.use(express.json()); // gives access to req.body

// connect our server to our db
massive({
    connectionString: DB_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    console.log('DB connected');
    app.set('db', dbInstance)
})

// turn on express-session and create session/identifier cookie
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52
    }
}));

// auth endpoints
app.post('/auth/signup', AC.signup);
app.post('/auth/signin', AC.signin);
app.post('/auth/signout', AC.signout);


app.listen(SERVER_PORT, () => console.log(`Server rocking it on ${SERVER_PORT}`));