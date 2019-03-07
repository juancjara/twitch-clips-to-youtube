const fs = require('fs');
const VideoLib = require('node-video-lib');

const getMetadata = (path) => {
    return new Promise((resolve, reject) => {
        fs.open(path, 'r', function(err, fd) {
            try {
                let movie = VideoLib.MP4Parser.parse(fd);
                fs.closeSync(fd);
                resolve({
                    duration: movie.relativeDuration(),
                    resolution: movie.resolution(),
                    size: movie.size(),
                })
            } catch (e) {
                fs.closeSync(fd);
                reject(e)
            }
        });
    })
}


module.exports = getMetadata