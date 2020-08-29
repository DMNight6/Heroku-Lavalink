const fs = require('fs')
const http = require('http')
let application = fs.readFileSync('./application.yml', 'utf8')

if (process.env.PORT) {
    application = application.replace('PORT', process.env.PORT)
}

if (process.env.PASS) {
    application = application.replace('PASS', process.env.PASS)
}
fs.writeFileSync('./application.yml', application)

const download = function (url, dest, cb) { // File download
    const file = fs.createWriteStream(dest);
    http.get(url, function (response) {
        response.pipe(file);
        console.log('Downloading Lavalink.jar')
        file.on('finish', function () {
            console.log('Downloaded Lavalink.jar')
            file.close(cb);
        });
    }).on('error', function (err) {
        fs.unlinkSync(dest);
        console.error(err)
    });
};

function startLavalink() {
    const spawn = require('child_process').spawn;
    const child = spawn('java', ['-jar', 'Lavalink.jar'])

    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')

    child.stdout.on('data', (data) => {
        console.log(data);
    });

    child.stderr.on('data', (data) => {
        console.error(data);
    });

    child.on('error', (error) => {
        console.error(error);
    });

    child.on('close', (code) => {
        console.log(`Lavalink exited with code ${code}`);
    });
}

const cdn = 'http://cdn.glitch.com/9cb86b78-568c-4263-8bbe-456709adf52f%2FLavalink.jar?v=1594771592451'
download(cdn, './Lavalink.jar', startLavalink)
