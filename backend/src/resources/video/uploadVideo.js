const fs = require('fs');
const util = require('util');
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const createClient = async () => {
  const { tokens } = await oauth2Client.refreshToken(process.env.GOOGLE_REFRESH_TOKEN);
  oauth2Client.setCredentials(tokens);
  const client = google.youtube({
    version: 'v3',
    auth: oauth2Client
  });
  return client;
};

const GAME_CATEGORY_ID = 20;

const uploadVideo = async ({ title, description, tags, path }) =>
  new Promise(async (resolve, reject) => {
    try {
      const client = await createClient();

      const parameters = {
        part: 'snippet,status',
        media: { body: fs.createReadStream(path) },
        notifySubscribers: false,
        resource: {
          snippet: {
            categoryId: GAME_CATEGORY_ID,
            defaultLanguage: 'en',
            description,
            tags: tags
              .split(',')
              .map(s => s.trim())
              .filter(s => s),
            title
          },
          status: {
            embeddable: true,
            privacyStatus: 'private'
          }
        }
      };
      var req = client.videos.insert(parameters, function(err, data) {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve({
            id: data.data.id,
            url: `https://youtu.be/${data.data.id}`
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });

module.exports = uploadVideo;
