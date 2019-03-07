const fs = require('fs')
const util = require('util')
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


function removeEmptyParameters(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
      var value = properties[p];
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '');
        if (value) {
          normalizedProps[adjustedName] = value.split(',');
        }
        delete normalizedProps[p];
      }
    }
    for (var p in normalizedProps) {
      // Leave properties that don't have values out of inserted resource.
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.');
        var ref = resource;
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa];
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p];
          } else {
            ref = ref[key] = ref[key] || {};
          }
        }
      };
    }
    return resource;
  }

const gg = async (requestData) => {
    try {

    const client = await createClient();
    var parameters = removeEmptyParameters(requestData['params']);
  parameters['media'] = { body: fs.createReadStream(requestData['mediaFilename']) };
  parameters['notifySubscribers'] = false;
  parameters['resource'] = createResource(requestData['properties']);
  var req = client.videos.insert(parameters, function(err, data) {
    if (err) {
      console.log('The API returned an error: ' + err);
    }
    if (data) {
      console.log(util.inspect(data, false, null));
    }
    console.log('faskdfjk')
    process.exit();
  });
  var fileSize = fs.statSync(requestData['mediaFilename']).size;
  console.log(fileSize)
/*
  var fileSize = fs.statSync(requestData['mediaFilename']).size;
  // show some progress
  var id = setInterval(function () {
      console.log(req);
    var uploadedBytes = req.connection._bytesDispatched;
    var uploadedMBytes = uploadedBytes / 1000000;
    var progress = uploadedBytes > fileSize
        ? 100 : (uploadedBytes / fileSize) * 100;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(uploadedMBytes.toFixed(2) + ' MBs uploaded. ' +
       progress.toFixed(2) + '% completed.');
    if (progress === 100) {
      process.stdout.write('Done uploading, waiting for response...');
      clearInterval(id);
    }
  }, 250);*/
      
    } catch(e) {
        console.log(e)
    }
}

//20 = game
gg({'params': {'part': 'snippet,status'}, 'properties': {'snippet.categoryId': '20',
'snippet.defaultLanguage': '',
'snippet.description': 'Description of uploaded video.',
'snippet.tags[]': 'test,another',
'snippet.title': 'ggwp',
'status.embeddable': '',
'status.license': '',
'status.privacyStatus': 'private',
'status.publicStatsViewable': ''
}, 'mediaFilename': 'tmp/compilation_1551655079134.mp4'})