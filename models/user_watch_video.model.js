const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const UserWatchVideo = sequelize.define("user_watch_video",{
        userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
        },
        videoId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'watch_videos',
              key: 'id',
              as: 'videoId',
            } 
        },
        watch_date:{
            type:Sequelize.DATE,
            defaultValue:Sequelize.NOW
        }

    });
    return UserWatchVideo
}