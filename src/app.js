const path = require("path")
const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/userRouter');
const userTask = require('./routers/taskRouter');

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public/");
app.use(express.static(publicDirectoryPath))

app.use(express.json());
//import routes from routers folder
app.use(userRouter);
app.use(userTask);

module.exports = app;
