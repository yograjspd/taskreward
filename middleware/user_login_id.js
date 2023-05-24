const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");

user_login_id_generate =  ()=>{
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  //var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

  var string_length = 6;
  var randomstring = '';
  for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars[rnum];
  }
  let qpay = 'QPAY'
  
  let final = qpay.concat(randomstring)
  return final;
}
module.exports = user_login_id_generate;