const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();

// Admin panel API Routes
const auth = require('./routes/admin/auth');
const category = require('./routes/admin/category');
const product = require('./routes/admin/product');

// Application APIs Routes
const appAuth = require('./routes/application/auth');
const appOrder = require('./routes/application/order');
const appData = require('./routes/application/data');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect database and create server
mongoose.connect(process.env.CONNECTION_URL,
    {   useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        useFindAndModify : false 
    }).then((res)=>{
        console.log('Connected!');

        // servere lisning on port 3000
        app.listen(process.env.PORT || 3000,()=>{
            console.log('server is running on port : ',process.env.PORT)
        })
    }).catch( err => { console.log(err) });


// Admin panel API Routes use
app.use('/admin/auth', auth);
app.use('/admin/category', category);
app.use('/admin/product', product);

// Application API Routes use
app.use('/app/auth', appAuth);
app.use('/app/order', appOrder);
app.use('/app/data', appData);

