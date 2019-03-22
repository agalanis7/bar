const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/userRouter');
const userTask = require('./routers/taskRouter');

const app = express();

app.use(express.json());
//import routes from routers folder
app.use(userRouter);
app.use(userTask);

module.exports = app;
