const express  = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path');
dotenv.config({
    path: path.join(__dirname, './config.env')
});
const tourRouter = require('./routes/tourRouter');
const profileRouter = require('./routes/profileRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const bookingRouter = require('./routes/bookingRouter');
const multer = require('multer');
const bookingController = require('./controllers/bookingController');
const cors = require("cors");
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000;
// const upload = multer({dest:})
app.use(helmet());
app.post(
    '/api/v1/webhooks/stripe',
    express.raw({ type: 'application/json' }),
    bookingController.stripeWebhook
);

app.use(express.json({limit:'500kb'}));
const limiter = rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:'draft-8',
  legacyHeaders:false,
  ipv6Subnet:56
})
app.use(limiter);
const accessOrigins = ["http://localhost:5173/",process.env.FRONTEND_URL]
app.use(cors({
  origin:accessOrigins,
  credentials:true
}));
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
