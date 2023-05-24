const { sequelize, Sequelize } = require("./db");
module.exports = (sequelize, Sequelize) =>{
  const Plan = sequelize.define("plans",{
      plan_title:{
        type: Sequelize.STRING
      },
      plan_content:{
        type: Sequelize.TEXT
      },
      is_active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      plan_amount:{
        type: Sequelize.FLOAT,
          defaultValue:0
      }      
  });
  return Plan;
}