const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const PinTransFer = sequelize.define("pin_transfers",{
        transfer_from_userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'transfer_from_userId',
            }
        },
        pin:{
            type: Sequelize.STRING,
            
        },
        transfer_to_userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'transfer_to_userId',
        }
    }

    })
    return PinTransFer;
}