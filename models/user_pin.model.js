const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const UserPin = sequelize.define("user_pins",{
        userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
        },
        user_pin:{
            type: Sequelize.STRING,
        },
        requested_pin_id:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'pins',
              key: 'id',
              as: 'requested_pin_id',
            }
        },
        planId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
            model: 'plans',
            key: 'id',
            as: 'planId',
          }
        },
        activate_date:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        is_active:{
            type: Sequelize.BOOLEAN,
            defaultValue: false, 
        }

    });
    return UserPin;
}