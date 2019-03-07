require('dotenv').config();

const db = require('../db');
const getClips = require('./getClipsUrls');
const Clip = require('../resources/clip/clip.model');
const downloadClip = require('./downloadClip');
const getMetadata = require('./getMetadata');

const start = async () => {
  try {
    await db.connect();

    const clips = await getClips({
      game: 'Dota 2',
      period: 'day',
      language: 'en',
      limit: 20
    });

    const paths = await Promise.all(
      clips.map(clip =>
        downloadClip({
          url: clip.videoUrl,
          name: clip.id
        })
      )
    );
    const metadata = await Promise.all(paths.map(async path => getMetadata(path)));

    const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

    await Clip.insertMany(
      clips.map((clip, i) => ({
        day: today,
        resolution: metadata[i].resolution,
        size: metadata[i].size,
        title: clip.title,
        twitchId: clip.id,
        channel: clip.channel,
        author: clip.creator,
        url: clip.url,
        embedUrl: clip.embedUrl,
        views: clip.views,
        duration: clip.duration,
        videoCreateAt: clip.createdAt,
        videoUrl: clip.videoUrl
      }))
    );
    console.log(`finished ${today}`);
  } catch (e) {
    console.log(e);
  }
};

start();
