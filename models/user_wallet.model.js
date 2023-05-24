const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const UserWallet = sequelize.define("user_wallets",{
        balance:{
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        userId:{
        type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
            as: 'userId',
          }
        },
        direct_income:{
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        refer_income:{
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        reward_income:{
            type: Sequelize.FLOAT,
            defaultValue:0 
        },
        watch_income:{
            type: Sequelize.FLOAT,
            defaultValue:0
        }
    });
    return UserWallet;
}