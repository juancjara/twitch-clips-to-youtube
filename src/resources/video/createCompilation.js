const { spawn } = require('child_process');

const createCompilation = async ({ paths, resolution, date }) => 
    new Promise((resolve, reject) => {
        try {
            let args = []
            paths.forEach(path => {
                args = args.concat(['-i', path])
            })
            const destPath = `tmp/${date}.mp4`;
            args = args.concat(['-y', '-filter_complex'])
            args.push(`${paths.map((_, i) => `[${i}:v]scale=${resolution}:force_original_aspect_ratio=1[v${i}];`).join(' ')} ${paths.map((_, i) => `[v${i}][${i}:a]`).join('')}concat=n=${paths.length}:v=1:a=1[v][a]`)
            args = args.concat(['-map',  '[v]' ,'-map', '[a]', destPath])
            console.log(args);
            const ffmpeg = spawn('ffmpeg', args)
            ffmpeg.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            
            ffmpeg.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            ffmpeg.on('exit', () => resolve(destPath))
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })

module.exports = createCompilation;