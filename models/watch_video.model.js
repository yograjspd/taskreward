const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const WatchVideo = sequelize.define("watch_videos",{
        video_url:{
            type: Sequelize.STRING
        },
        video_date:{
            type:Sequelize.DATE,
            defaultValue:Sequelize.NOW
        }

    });
    return WatchVideo
}