const { request } =  require('express');
const Sequelize = require("sequelize");
mobile_number_validate = (mobile_number)=>{
  var mobileno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(mobile_number.match(mobileno)) {
    return true;
  }
  else {    
    return false;
  }
}
module.exports = mobile_number_validate;