const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("users",{
      username:{
        type: Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      mobile:{
        type:Sequelize.STRING
      },      
      profile_image:{
        type:Sequelize.TEXT
      },     
      isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
      },     
      roleId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'roles',
          key: 'id',
          as: 'roleId',
        }
      },      
      state:{
        type:Sequelize.STRING,
      },
      city:{
        type:Sequelize.STRING
      }, 
      password:{
        type:Sequelize.STRING,
        
      },
      sponser_id:{
        type:Sequelize.STRING,
      },
      user_login_id:{
        type:Sequelize.STRING,
      },
      user_type:{
        type:Sequelize.STRING,
        defaultValue:"user"

      }       
    });
    return User;
  };