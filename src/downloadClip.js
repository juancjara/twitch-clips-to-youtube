const fs = require('fs');
const https = require('https')

const download = ({ url, name}) => 
    new Promise((resolve, reject) => {
        try {
            const dest = `tmp/${name}.mp4`
            const file = fs.createWriteStream(dest);
            https.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    console.log('finish one', url)
                    resolve(dest)  
                }).on('error', function(err) {
                    file.close(() => reject(err))
                })
            })

        } catch(e) {
            reject(e)
        }
    })

module.exports = download;