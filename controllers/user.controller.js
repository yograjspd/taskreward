const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");
const config = require("../config/auth.config.js");
const User = db.users;
const Role = db.role;
const BankDetail = db.bank_details;
const WithdrawAmount = db.withdraw_amounts;
const UserPin = db.user_pins;
const UserWallet = db.user_wallets;
const UserLevel = db.user_levels;

var bcrypt = require("bcryptjs");
var getUserProfile = async(req, resp)=>{
  try{
      if(!req.body){
          return resp.status(400).send({message:"Content can not be empty !"})
      }else{
          //console.log('userss',req.params.id)
        let user = await User.findOne({where:{id:req.params.id}})
        if(!user){
            return resp.status(200).send({message:"User Not found !",status:false})
        }else{
            let response = {
                "status":true,
                "message":"User fetched successfully",
                "data":user
            }
            resp.status(200).json(response)
        }
      }
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}

var updateUserProfile = async(req, resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      let user_data = {
        username:req.body.username,
        email:req.body.email,
        mobile:req.body.mobile,
        state:req.body.state,
        city:req.body.city        
      }
      data = await User.update({"username":req.body.username,"email":req.body.email,"mobile":req.body.mobile,"state":req.body.state,"city":req.body.city},{where:{'id':req.params.id}})
      let response = {
        "status":true,
        "message":"User Profile Update Successfully",
        "data":data
      }
      resp.status(200).json(response);
    }
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var UserBankDetail = async(req, resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }
    let bank_detail = await BankDetail.findOne({where:{userId:req.params.id}})
    console.log(bank_detail)
    if(bank_detail){
      let data = await BankDetail.update({'bank_name':req.body.bank_name,'holder_first_name':req.body.holder_first_name,'holder_last_name':req.body.holder_last_name,'bank_ifsc':req.body.bank_ifsc,'bank_account_no':req.body.bank_account_no},{where:{userId:req.params.id}})
      let response = {
        "status":true,
        "message":"User Bank Detail update Successfully",
        "data":data
        }
    resp.status(200).json(response);

    }else{
      const bank_detail ={
        bank_name:req.body.bank_name,
        holder_first_name:req.body.holder_first_name,
        holder_last_name:req.body.holder_last_name,
        bank_ifsc:req.body.bank_ifsc,
        bank_account_no:req.body.bank_account_no,
        userId:req.params.id
      }
      let data = await BankDetail.create(bank_detail)
      await data.save()
      let response = {
        "status":true,
        "message":"User Bank Detail submit Successfully",
        "data":data
        }
    resp.status(200).json(response);
    }
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
} 
var getUserBankDetail = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }
    let bank_detail = await BankDetail.findOne({include:[{model:User}]},{where:{userId:req.params.id}})
    if(bank_detail){
      let response = {
        "status":true,
        "message":"User Bank Detail fetched Successfully",
        "data":bank_detail
        }
    resp.status(200).json(response);
    }else{
      let response = {
        "status":true,
        "message":"User Bank Detail not found",
        
        }
    resp.status(200).json(response);
    }
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var withdrawUseramount = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }    
    let user_pin = await UserPin.findAll({where:{userId:req.userId,activate_date:Date.now()}})
    if((!user_pin) ||((user_pin)&&(user_pin.length<2))){
      let response = {
        "status":false,
        "message":"Please activate two pin before withdraw"        
        }
      resp.status(200).json(response);
    }else{    
    let today_withdraw = await WithdrawAmount.findOne({where:{withdraw_date:Date.now()}})
    if(today_withdraw){
      let response = {
        "status":false,
        "message":"User Already withdraw today",
        
        }
      resp.status(200).json(response);
    }else{
      let withdraw_amount = req.body.amount
      if((withdraw_amount>100) || (withdraw_amount<50000)){
        let response = {
          "status":false,
          "message":"withdraw amount must be greater then 100 and less then 50000",
          
          }
        resp.status(200).json(response);
      }else{
        let withdrow = await WithdrawAmount.create({'userId':req.userId,'withdraw_date':Date.now(),'amount':req.body.amount})
      await withdrow.save()
      let response = {
        "status":true,
        "message":"User Bank Detail not found",
        
        }
      resp.status(200).json(response);
      }      

    }
  }
    //const NOW = new Date();
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var UserDashboard = async(req,resp)=>{
  try{
     let user = await User.findOne({where:{id:req.userId}})
     let direct_team = await User.findAll({where:{sponser_id:user.sponser_id}})
     let total_direct_team
     if (direct_team){
       total_direct_team = direct_team.length

     }else{
      total_direct_team = 0
     }
      let user_wallet = await UserWallet.findOne({where:{userId:req.userId}})
      let balance
      if(user_wallet){
        balance = user_wallet.balance

      }else{
        balance = 0
      }
      let withdraw_amount = await WithdrawAmount.findAll({
        attributes: [
          'userId',
          [Sequelize.fn('sum', Sequelize.col('amount')), 'total_amount'],
        ],
        group: ['userId'],
        raw: true
      });
      let withdraw_amt
      if (withdraw_amount){
        withdraw_amt = withdraw_amount.length
      }else{
        withdraw_amt
      }
      let user_downTeam = await UserLevel.findAll({where:{parentId:req.userId}})
      let total_downTeam
      if(user_downTeam){
        total_downTeam = user_downTeam.length

      }else{
        total_downTeam = 0
      }
      //console.log(withdraw_amount)
      let data = {'total_direct_team':total_direct_team,'balance':balance,'total_downTeam':total_downTeam,'withdraw_amount':withdraw_amt}
      let response = {
        "status":true,
        "message":"User Dashboard",
        "data":data
        
        }
      resp.status(200).json(response);
       

  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
module.exports = {
    getUserProfile,
    updateUserProfile,
    UserBankDetail,
    getUserBankDetail,
    withdrawUseramount,
    UserDashboard

}