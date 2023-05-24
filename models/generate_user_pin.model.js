const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const GenerateUserPin = sequelize.define("generate_user_pins",{
        userId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'userId',
            }
        },
        userpin:{
            type: Sequelize.STRING
        }
    });
    return GenerateUserPin
}