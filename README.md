# heroku-lavalink-updated
Easily deploy [lavalink](https://github.com/freyacodes/Lavalink) server on heroku.
This build is based on [karyeet's Lavalink](https://github.com/karyeet). It's reliable.
This branch will download the latest lavalink repacked by [DespenserTeam's Lavalink](https://github.com/DespenserTeam/Lavalink-arm64/) (With Arm64/aarch64 architecture supported)

### Updating lavalink
*Don't worry my friend, you just need to restart the dyno :D*

### One Click Deploy:
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/DMNight6/Heroku-Lavalink/tree/master)

Buildpacks should be added automatically. Modify `PASS` before starting to change the password of the Lavalink.

### Github Deploy:
1. Create a fork of this repo.
2. Navigate to your heroku project @[To the dashboard we go!](https://dashboard.heroku.com)
3. Navigate to your project *"Settings"*, click *"Reveal Config Vars"*, and set a new var called *PASS* and set it to the pass you wish it to be :D
4. Navigate to the *"Deploy"* tab
5. Find/Click the *"Connect to Github"* section and login if prompted
6. For the repo name, type *"Heroku-Lavalink"* and click *"Search"*
7. Click *"Connect"*
8. Scroll down and click *"Deploy Branch"*

### Heroku CLI Deploy:
1. Download files (Clone/Download -> Download ZIP).
2. Extract files into an empty directory ( Skip if you use clone )
3. Follow https://devcenter.heroku.com/articles/git.
If heroku is unable to automatically configure the buildpacks, go to your projects settings on the heroku website and add java and nodejs.
4. Go to project settings -> Config Vars on heroku and set new var called *PASS* to the pass you wish your client wants to use.

**Extra Notes:**
1. After changing the PASS, you need to restart by clicking *Restart All Dynos*.
2. If heroku unable to configure buildpacks automatically, navigate to your *App*/*Projects* settings on the web and add JAVA and NODEJS.

Please understand your lavalink server ***will most likely to run out of memory on free dyno***. I recommend upgrade your dyno or switch to lighter alternatives.