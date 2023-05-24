const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const BankDetail = sequelize.define("bank_details",{
        bank_name:{
            type: Sequelize.STRING
        },
        holder_first_name:{
            type: Sequelize.STRING
        },
        holder_last_name:{
            type: Sequelize.STRING
        },
        bank_ifsc:{
            type: Sequelize.STRING
        },
        bank_account_no:{
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
          },

    });
    return BankDetail;
};