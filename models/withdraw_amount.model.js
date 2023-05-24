const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const WithdrawAmount = sequelize.define("withdraw_amounts",{
        userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
        },
        withdraw_date:{
            type:Sequelize.DATE,
            defaultValue:Sequelize.NOW
        },
        amount:{
            type: Sequelize.FLOAT,
            defaultValue:0
        }

    });
    return WithdrawAmount;

}