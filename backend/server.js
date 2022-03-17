const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());


app.use(express.json());
 

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');


app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});