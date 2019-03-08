const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    error: String,
    clips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clip'
      }
    ],
    status: {
      type: String,
      required: true,
      enum: ['processing', 'error_processing', 'uploading', 'error_uploading', 'completed'],
      default: 'processing'
    },
    day: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: String,
      required: true,
      trim: true
    },
    youtubeVideoId: {
      type: String,
      trim: true
    },
    youtubeVideoUrl: {
      type: String,
      trim: true
    },
    resolution: {
      type: String,
      trim: true
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model('video', videoSchema);
