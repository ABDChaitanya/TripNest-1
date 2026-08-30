const express  = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.join(__dirname, './config.env')
});
const tourRouter = require('./routes/tourRouter');
const profileRouter = require('./routes/profileRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const bookingRouter = require('./routes/bookingRouter');
const bookingController = require('./controllers/bookingController');
const cors = require("cors");
const mongoose = require('mongoose')
const app = express();
const port = 3002;
app.post(
    '/api/v1/webhooks/stripe',
    express.raw({ type: 'application/json' }),
    bookingController.stripeWebhook
);

app.use(express.json());
app.use(cors());
app.set("query parser","extended");
app.use('/api/v1/profile',profileRouter);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/bookings',bookingRouter);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});
app.listen(port,()=>{
    console.log(`App is running on ${port}`)
})
