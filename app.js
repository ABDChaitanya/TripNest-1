const express  = require('express');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const cors = require("cors");
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose')
const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());
app.set("query parser","extended");
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/reviews',reviewRouter);
dotenv.config({
    path:path.join(__dirname,'./config.env')
})
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
