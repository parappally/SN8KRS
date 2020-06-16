const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const shoesRouter = require('./routes/shoes');
const offersRouter = require('./routes/offers');
const messagesRouter = require('./routes/messages');

app.use('/users', usersRouter);
app.use('/shoes', shoesRouter);
app.use('/offers', offersRouter);
app.use('/messages', messagesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});