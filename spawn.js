const fs = require('fs')
const http  = require('http');
const axios = require('axios').default;
const { resolve } = require('path')
const { createCfg } = require('./createCfg');

async function Download(url, dest, func) {
    const file = fs.createWriteStream(dest);
    axios.get(url, {responseType: 'stream'})
        .then(res => res.data)
        .then(data => {
            data.pipe(file)
            file.on("finish", async () => {
                console.log('Downloaded Lavlink.')
                file.close()
                await func()
            })
        })
}

async function spawnLv() {
    if (!fs.existsSync(resolve(__dirname, 'application.yml'))) await createCfg()
    else {
        fs.unlinkSync(resolve(__dirname, 'application.yml'))
        await createCfg();
    }
    
    let child = require('child_process').spawn('java', [
        `-jar`,
        `-Xmx${Math.trunc(require('os').totalmem()/(1024*1024))}m`, // Auto memory calculation
        `-XX:ActiveProcessorCount=${require('os').cpus().length}`,
        `-XX:CICompilerCount=${require('os').cpus().length}`,
        `-XX:+UseParallelGC`,
        resolve(__dirname, 'Lavalink', 'Lavalink.jar')
    ]);

    child.stdout.setEncoding('utf-8')
    child.stderr.setEncoding('utf-8')

    child.on('spawn', () => console.log('Successfully started Lavalink.'))
        .on('exit', (code) => console.log('Exited Lavalink with code • ' + code))

    child.stdout.on('data', (data) => {
        console.log(`${data}`)
    });

    child.stderr.on('data', (data) => {
        console.error(`${data}`)
    });
}

console.log(`Getting Latest Lavalink.jar, Wait for a moment please...`)
axios.get("https://api.github.com/repos/DespenserTeam/Lavalink-arm64/releases/latest") 
    .then(res => Object(res.data))
    .then(json => {
    if (json.assets[0] && json.assets[0].browser_download_url) {
        console.log(`Found • ${json.assets[0].browser_download_url}`)
        Download(json.assets[0].browser_download_url, resolve(__dirname, 'Lavalink', 'Lavalink.jar'), spawnLv)
    } else {
        console.warn('Unable to find latest .jar')
        console.warn('Attempting to download previous version')

        let priorVersion = json["tag_name"].split(".")
        priorVersion[priorVersion.length -1] = Number(priorVersion[priorVersion.length-1])-1
        priorVersion[0] = priorVersion[0].replace("v", "")
        priorVersion = priorVersion.join('.')

        let priorDL_URL = `https://github.com/freyacodes/Lavalink/releases/download/${priorVersion}/Lavalink.jar`
        console.log(`Found • ${priorDL_URL.toString()}`)
        Download(priorDL_URL, resolve(__dirname, 'Lavalink', 'Lavalink.jar'), spawnLv)
    }
}).catch(err => {
    console.error("Error occured when fetching latest release : " + err)
})
