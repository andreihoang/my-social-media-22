const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute =  require('./routes/posts');

const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connect to Mongo DB");
});

// Middle ware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
    console.log(`App is running on ${process.env.PORT}...`);
})
