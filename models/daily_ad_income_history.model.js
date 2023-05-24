const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const DailyAdIncome = sequelize.define("daily_ad_income_histories",{
        userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
        },
        watch_income:{
            type: Sequelize.FLOAT,
            defaultValue:0
        }
    })
    return DailyAdIncome;
}