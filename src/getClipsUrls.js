const api = require('twitch-api-v5');

api.clientID = process.env.TWITCH_CLIENT_ID;

/*
{ id: 'HonorableImpartialOctopusTBCheesePull',
  tracking_id: '411215548',
  url:
   'https://clips.twitch.tv/HonorableImpartialOctopusTBCheesePull?tt_medium=clips_api&tt_content=url',
  embed_url:
   'https://clips.twitch.tv/embed?clip=HonorableImpartialOctopusTBCheesePull&tt_medium=clips_api&tt_content=embed',
  embed_html:
   '<iframe src=\'https://clips.twitch.tv/embed?clip=HonorableImpartialOctopusTBCheesePull&tt_medium=clips_api&tt_content=embed\' width=\'640\' height=\'360\' frameborder=\'0\' scrolling=\'no\' allowfullscreen=\'true\'></iframe>',
  broadcaster:
   { id: '21390470',
     name: 'singsing',
     display_name: 'singsing',
     channel_url: 'https://www.twitch.tv/singsing',
     logo:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/singsing-profile_image-11f10df8952aee16-150x150.jpeg' },
  curator:
   { id: '66278531',
     name: 'dotasmurfing',
     display_name: 'dotasmurfing',
     channel_url: 'https://www.twitch.tv/dotasmurfing',
     logo:
      'https://static-cdn.jtvnw.net/user-default-pictures/cd618d3e-f14d-4960-b7cf-094231b04735-profile_image-150x150.jpg' },
  vod:
   { id: '389687919',
     url: 'https://www.twitch.tv/videos/389687919?t=2h26m20s',
     offset: 8780 },
  broadcast_id: '33014746720',
  game: 'Dota 2',
  language: 'en',
  title: 'it\'s like now',
  views: 18123,
  duration: 22.6,
  created_at: '2019-03-03T16:31:51Z',
  thumbnails:
   { medium:
      'https://clips-media-assets2.twitch.tv/AT-cm%7C411215548-preview-480x272.jpg',
     small:
      'https://clips-media-assets2.twitch.tv/AT-cm%7C411215548-preview-260x147.jpg',
     tiny:
      'https://clips-media-assets2.twitch.tv/AT-cm%7C411215548-preview-86x45.jpg' } }
  */

const getClips = async (filters = {}) => 
        new Promise((resolve, reject) => {
            api.clips.top({
                limit: 30,
                ...filters
            }, (err, res) => {
                if (err) return reject(err)
                const formmatedClips = res.clips.map(({ tracking_id, url, embed_url, broadcaster, curator, title, thumbnails: { tiny }, views, duration, created_at }) => (
                    {
                        title,
                        id: tracking_id,
                        channel: broadcaster.name,
                        creator: curator.name,
                        url,
                        embedUrl: embed_url,
                        views,
                        duration,
                        createdAt: created_at,
                        videoUrl: tiny.replace(/-preview.*/g, '.mp4')
                    }
                ))
                resolve(formmatedClips)
            })
        })

module.exports = getClips