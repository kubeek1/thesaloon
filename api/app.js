let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let cors = require('cors');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// MongoDB connection
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

// Require route
let incidentsRouter = require('./routes/incidents');
let reservationsRouter = require('./routes/reservations');
let carsRouter = require('./routes/cars');
let customersRouter = require('./routes/customers');
let authRouter = require('./routes/auth');


// View engine setup
let app = express();
let corsOptions = {
  origin: ['http://localhost:3000', 'https://thesaloon.vercel.app'],
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/reservations', reservationsRouter);
app.use('/api/cars', carsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/auth', authRouter);


app.get('/api', (req, res) => {
  res.send('Serwer aktywny. PORT 9000');
});

process.env.TZ = 'Europe/London';
module.exports = app;
