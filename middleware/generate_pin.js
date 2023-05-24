const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");

user_pin_generate = ()=>{
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 10;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars[rnum];
    }
    return randomstring;
}
module.exports = user_pin_generate;