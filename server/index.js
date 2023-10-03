const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();
app.use(express.json());
const rateLimit = require("express-rate-limit");

//(Security) rate limiting middleware 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});



// routers
const userRoutes =require('./routes/user_route');



//env file
//auth controller
 const auth =require('./controllers/auth_controller');

const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
// create token function
// const ApiError = require('../utils/apiError');



const PORT =process.env.PORT || 5000;
const HOST = process.env.HOST||'127.0.0.1';
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}


//apply requests limiter as a middleware
app.use('/api',limiter) 
//Here i applied rate limiter to limit the incomming requests rate, auth.login function to handle the creation of the user db entity and his token token and auth.protect to to handle token issues 
 app.use('/api/login',auth.login);
 app.use('/api/user',userRoutes);
app.post('/api/logout',auth.protect,auth.logout);




app.all('*', (req, res, next) => {
  res.status(400).send(`Can't find this route: ${req.originalUrl}`);
});







sequelize.sync({forse: true})
  .then(() => {
    console.log("DB Sync Done Successfully!");
    app.listen(PORT, HOST, () => {
      console.log(`Server is listening on http://${HOST}:${PORT}`)
    });
  })
  .catch((err) => {
    console.log(`Failed to Sync with DB: ${err.message}`);
  });


