require('dotenv').config()

const getClips = require('./getClipsUrls');
const Clip = require('./resources/clip/clip.model');
const downloadClip = require('./downloadClip');
const getMetadata = require('./getMetadata')
const db = require('./db')
//const createCompilation = require('./createCompilation');
//const uploadVideo = require('./uploadVideo')

const start = async () => {
    await db.connect();

    const clips = await getClips({
        game: 'Dota 2',
        period: 'day',
        language: 'en',
        limit: 20,
    })
    //filter the one already used

    //validate videos not being the same
    //get the validaiton from web (ids) and continue with the flow
    
    const paths = await Promise.all(clips.map(clip => downloadClip({
        url: clip.videoUrl, name: clip.id})));
    const metadata = await Promise.all(paths.map(async path => getMetadata(path)))

    const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`

    await Promise.all(clips.map((clip, i) => Clip.create({
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
    })))
    /*const gg = await db.createClip({
        day: today,
        resolution: metadata[0].resolution,
        size: metadata[0].size,
        title: clips[0].title,
        twitchId: clips[0].id,
        channel: clips[0].channel,
        author: clips[0].creator,
        url: clips[0].url,
        embedUrl: clips[0].embedUrl,
        views: clips[0].views,
        duration: clips[0].duration,
        videoCreateAt: clips[0].createdAt,
        videoUrl: clips[0].videoUrl
    })
    return console.log(gg);*/

    /*
    const videoPath = await createCompilation({
        paths,
    })*/
    
    //remove sources , updated
    /*
    const videoUrl = await uploadVideo({ path: videoPath });*/
    console.log('finish')
}

start()