// const app = require('express')(); // ?
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
// const bodyParser = require('body-parser'); // https://stackoverflow.com/a/24330353/9259701
const cookieParser = require('cookie-parser')
const morgan = require('morgan');

// refactor import of routes
const productRoutes = require('../controllers/product')

const orderRoutes = require('../controllers/order');


let morganFormat = 'tiny'
if (app.get('env') === 'production') { // process.env.NODE_ENV
    app.set('trust proxy', 1) // trust first proxy
    morganFormat = ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
}

// set morgan to log info about our requests for development use.
app.use(morgan(morganFormat))


// The app.locals object has properties that are local variables within the application.
app.locals.title = 'Soger TakeHome';

app.locals.email = process.env.THE_EMAIL;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET))


app.use('/api', [orderRoutes, productRoutes]);

// must be last route because of 404 pages/error
app.use(function (req, res) {
    res.send('Uhmmmm, 404. What do you want?');
});


var helmet = require('helmet');
app.use(helmet());



module.exports = app; // app.get('env')
