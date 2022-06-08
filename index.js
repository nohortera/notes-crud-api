require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Router = require('express');
const apiRouter = new Router();
const authRouter = require('./routers/authRouter');
const noteRouter = require('./routers/noteRouter');
const profRouter = require('./routers/profRouter');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', '*');
  res.append('Access-Control-Allow-Headers', '*');
  next();
});
app.use('/api', apiRouter);

apiRouter.use('/auth', authRouter);
apiRouter.use('/notes', noteRouter);
apiRouter.use('/users', profRouter);


const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin123@cluster0.fp14v.mongodb.net/db_and_auth?retryWrites=true&w=majority');
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();


