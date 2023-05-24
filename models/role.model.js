const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize,Sequelize)=>{
    const Role = sequelize.define("roles", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        name: {
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
      return Role;
};