const Video = require('./video.model');
const createCompilation = require('./createCompilation');
const uploadVideo = require('./uploadVideo');

const getOne = async (req, res) => {
  try {
    const video = await Video.findOne({
      day: req.params.date
    })
      .lean()
      .exec();
    if (!video) {
      return res.status(400).end();
    }

    res.status(200).json({ data: video });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const createOne = async (req, res) => {
  try {
    const { title, description, tags, clips, day, resolution } = req.body;

    const video = await Video.create({
      resolution,
      clips: clips.map(clip => clip.id),
      day,
      title,
      description,
      tags
    });
    res.status(201).json({ data: video });

    const outputPath = await createCompilation({
      paths: clips.map(clip => `tmp/${clip.twitchId}.mp4`),
      date: day,
      resolution: req.body.resolution
    });
    await Video.findByIdAndUpdate(video._id, {
      status: 'uploading'
    });

    const youtubeVideo = await uploadVideo({
      title,
      description,
      tags,
      path: outputPath
    });
    await Video.findByIdAndUpdate(video._id, {
      status: 'completed',
      youtubeVideoId: youtubeVideo.id,
      youtubeVideoUrl: youtubeVideo.url
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  getOne,
  createOne
};
