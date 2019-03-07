const Video = require('./video.model');
const createCompilation = require('./createCompilation');
const uploadVideo = require('./uploadVideo');

const withErrorHanlder = fn => (req, res) => {
  try {
    fn(req, res);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getOne = async (req, res) => {
  const video = await Video.findOne({
    day: req.params.date
  })
    .lean()
    .exec();
  if (!video) {
    return res.status(400).end();
  }

  res.status(200).json({ data: video });
};

const createOne = async (req, res) => {
  const { title, description, tags } = req.body;

  const video = await Video.create({ ...req.body });
  res.status(201).json({ data: video });
  const outputPath = await createCompilation({
    paths: [],
    date: req.body.date,
    resolution: req.body.resolution
  });
  await Video.findOneAndUpdate(
    {
      _id: video._id
    },
    {
      status: 'uploading'
    }
  );

  //update status
  const response = await uploadVideo({
    title,
    description,
    tags,
    path: outputPath
  });
  await Video.findOneAndUpdate(
    {
      _id: video._id
    },
    {
      status: 'completed'
    }
  );
  //update status
};

module.exports = {
  getOne: withErrorHanlder(getOne),
  createOne: withErrorHanlder(createOne)
};
