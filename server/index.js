import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import morgan from 'morgan'
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"

const app = express()
//body parser to send in post request
app.use(morgan('dev'));
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use(cors())

app.use("/users", userRouter) /// https://localhost:5000/users/signup
app.use("/tours", tourRouter) /// https://localhost:5000/tours/create
const connection_url = "mongodb+srv://taiwo:amoo2323@cluster0.ya9nmiv.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect(connection_url, {
  // useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () =>
  console.log(`connection is established and running on port : ${PORT}`)
)).catch((err) => console.log(err.message));