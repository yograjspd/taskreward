const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const Pin = sequelize.define("pins",{
        planId:{
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'plans',
            key: 'id',
            as: 'planId',
          }
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
        no_pin:{
          type: Sequelize.INTEGER,          
        },
        amount:{
          type: Sequelize.FLOAT,
          defaultValue:0 
        },
        total_amout:{
          type: Sequelize.FLOAT,
          defaultValue:0 
        },
        pin_image:{
          type:Sequelize.TEXT
        },
        slip_no:{
          type: Sequelize.STRING,          
        },
        discount:{
          type: Sequelize.FLOAT,
          defaultValue:0 
        },
        status:{
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        // expire_date:{
        //   type: Sequelize.DATE,
        //   defaultValue: Sequelize.NOW
        // }
    });
    return Pin;
}