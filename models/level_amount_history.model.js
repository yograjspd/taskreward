const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const LevelAmountHistory = sequelize.define("level_amount_histories",{
        
        user_login_id:{
            type:Sequelize.STRING,
        },
       
        amount:{
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        level:{
            type : Sequelize.INTEGER,
            defaultValue: 1

        }


    })
    return LevelAmountHistory
}