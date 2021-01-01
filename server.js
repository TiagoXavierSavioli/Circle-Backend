const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./src/Utils/routes/users');

const app = express();

// boorder parser middleware
app.use(express.json());

// load env
dotenv.config({ path: './config.env'})
// connect to database
const db = config.get('mongoURI');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('mongodb is connected...'))
    .catch((err) => console.log(err))

// log route actions
if(process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'))
}

//use routes
//auth routes
app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`))

