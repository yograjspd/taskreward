const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
    const UserLevel = sequelize.define("user_levels",{
        parentId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'parentId',
            }
        },
        parent_user_id:{
            type:Sequelize.STRING,
        },
        child_user_id:{
            type:Sequelize.STRING, 
        },
        childId:{
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id',
              as: 'childId',
            }
        },
        amount:{
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        level_id:{
            type : Sequelize.ARRAY(Sequelize.INTEGER),
            defaultValue: null

        }


    })
    return UserLevel
}