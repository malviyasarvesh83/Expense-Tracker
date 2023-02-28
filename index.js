const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const cors = require('cors');
const User = require('./models/user');
// import Routes
const userRoutes = require('./routes/user');

const app = express();
dotenv.config();

// Template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is successfully running on port : ${port}`);
})

// Template Engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use('/', userRoutes);

// Database Connection
sequelize.sync().then(result => {
    console.log('Database Connected Successfully..!');
}).catch(err => {
    console.log(err);
})