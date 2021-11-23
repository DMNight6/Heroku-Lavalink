const fs = require('fs')
const path = require('path')
const yaml = require('yaml')

const LavalinkConfig = {
    server: {
        port: process.env.PORT | 2333,
        address:"0.0.0.0",
    },

    lavalink: {
        server: {
            password: process.env.PASS |"youshallnotpass",
            sources: {
                youtube: true,
                bandcamp: true,
                soundcloud: true,
                twitch: true,
                vimeo: true,
                http: true,
                local: true,
        },
        bufferDuration: 400,
        youtubePlaylistLoadLimit: 6,
        youtubeSearchEnabled: true,
        soundcloudSearchEnabled: true,
        gc_warning: true,
        },
    },
    metrics: {
        prometheus: {
            enabled: true,
            endpoint:"/metrics",
        },
    },
    sentry: {
        dsn: "",
    },
    logging: {
        file: {
            max_history:"30",
            max_size:"1GB",
        },
        path:"./logs/"
    },
} // File Data of application.yml. 

let Formatting = yaml.stringify(LavalinkConfig, { indent: 5 });

module.exports.createCfg = async function() {
    fs.writeFileSync(path.resolve(__dirname, "application.yml"), Formatting)
    let app = fs.readFileSync(path.resolve(__dirname, 'application.yml'), 'utf-8')
    app.replace('_', '-')
    app.replace('"', " ")
    return fs.writeFileSync(path.resolve(__dirname, 'application.yml'), app)
}