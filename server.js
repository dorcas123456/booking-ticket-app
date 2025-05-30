const express = require('express'); //express declaration
const mongoose = require('mongoose');//mongoose declaration
const app = express();//app declaration
const morgan = require('morgan');
const signup = require('./route/signup.route'); //from route
const ticket = require('./route/ticket.route'); //from route
const cors = require('cors');

const dotenv= require('dotenv');
dotenv.config();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));//more details logged in development mode 
} else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined')); //standard logging in production mode
}

const dbURI = "mongodb://localhost:27017/minecraft";//mongoose port declaration

mongoose.connect(dbURI)
.then(() => console.log('the database is connected successfully.....'))
.catch((err) => console.log('the database is not connected. check properly', err));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//adding piece of middleware
app.use(express.json())
app.use('/api/v1/user', signup);
app.use('/api/v1/book-items', ticket);

//port 
const port = 4000;
if (port){
    app.listen(port, () => console.log(`server running on port ${port}`));
}else {
    console.log(`server not running on port ${port}`);
}

/*const port = process.env.port || 4000;
app.listen(port, () => console.log(`server running on port ${port}`));*/