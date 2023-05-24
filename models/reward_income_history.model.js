const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const RewardIncomeHistory = sequelize.define("reward_income_histories",{
        userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
        },
        reward_income:{
            type: Sequelize.FLOAT,
            defaultValue:0
        }
    })
    return RewardIncomeHistory;
}