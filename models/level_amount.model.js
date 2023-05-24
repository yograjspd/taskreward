const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const LevelAmount = sequelize.define("level_amounts",{
        
        user_login_id:{
            type:Sequelize.STRING,
        },
       
        level:{
            type : Sequelize.INTEGER,
            defaultValue: 1

        }


    })
    return LevelAmount
}