const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    twitchId: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    embedUrl: {
      type: String,
      require: true
    },
    views: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    resolution: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    videoCreateAt: {
      type: Date,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model('clip', clipSchema);
