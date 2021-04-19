const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
  

const connection = mongoose.connection;

connection.once("open", () =>{
     console.log("MongoDB connection success!");
})

const branchRouter = require("./routes/branches.js");
app.use("/branch", branchRouter);

app.listen(PORT, () => {
     console.log(`Server is up and running on port no: ${PORT}`)
})

