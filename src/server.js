const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const { connect } = require('./db');
const clipRouter = require('./resources/clip/clip.router');
const videoRouter = require('./resources/video/video.router');

const app = express();

app.disabled('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/video', videoRouter);
app.use('/api/clip', clipRouter);

module.exports.start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log('listening in %s', process.env.PORT);
    });
  } catch (e) {
    console.error(e);
  }
};
