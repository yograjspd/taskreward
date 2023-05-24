const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");
const config = require("../config/auth.config.js");
const upload = require('../middleware/uploads');
const user_pin_generate = require('../middleware/generate_pin.js');
const path =require("path");
const Plan = db.plans;
const Pin = db.pins;
const User = db.users;
const UserPin = db.user_pins;
const UserWallet = db.user_wallets;
const PinTransFer = db.pin_transfers;
const UserLevel = db.user_levels;
const RewardIncomeHistory = db.reward_income_histories;
var BuyPin = async(req, resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      console.log(req.body)
      const addPin = {
        planId:req.body.planId,
        userId:req.body.userId,
        no_pin:req.body.no_pin,
        amount:req.body.amount,
        total_amout:req.body.total_amout,
        pin_image:req.file.filename,
        slip_no:req.body.slip_no,
        discount:req.body.discount
      }
      let data = await Pin.create(addPin);
      await data.save();
      let response = {
        "status":true,
        "message":"Buy Pin Request send successfully",
        "data":data
      }
      resp.status(200).json(response)

    }

  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var PinRequestList = async(req, resp)=>{
  let pins_list = await Pin.findAll({include:[{model:User},{model:Plan}]})
  response = {
    "status":true,
    "message":"Pin request fetched successfully",
    "data":pins_list
  }
  resp.status(200).json(response);

}
var PinRequestDetail = async(req,resp)=>{
  let pin_data = await Pin.findOne({where:{id:req.params.id}})
  
  //console.log('pin_data',req.params.id)
  if (pin_data.pin_image!=null){
    var image_url = `${global.__baseurl}/image/${pin_data.pin_image}`
    pin_data.pin_image = image_url

  }
  let response = {
    "status":true,
    "message":"Pin detail successfully fetched",
    "data":pin_data
  }
  resp.status(200).json(response)
}
var PinRequestApprove = async(req,resp)=>{
  let pin = await Pin.findOne({where:{id:req.params.id}})
  console.log('pin',pin)
  if((pin) && (pin.status==false)){
    let pin_data = await Pin.update({"status":req.body.status},{where:{'id':req.params.id}})
  let user_pin = await UserPin.create({'userId':pin.userId,'user_pin':user_pin_generate(),'requested_pin_id':pin.id,'planId':pin.planId,'activate_date':Date.now(),'is_active':true})
  await user_pin.save()
  //await UserWallet

  let response = {
    "status":true,
    "message":"Pin request approve successfully",
    "data":user_pin
  }
  resp.status(200).json(response)

  }else{
    let response = {
      "status":false,
      "message":"Pin request already approved",
      
    }
    resp.status(200).json(response)
  }
}
var PinUpgradeId = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }
    let user_pin = await UserPin.findOne({where:{user_pin:req.body.e_pin,userId:req.userId}})
   if(user_pin){
    await UserPin.update({'planId':req.body.planId,'activate_date':Date.now(),'is_active':true},{where:{user_pin:req.body.e_pin,userId:req.userId}})
    let response = {
      "status":true,
      "message":"Pin Activate Successfully",
      
    }
    resp.status(200).json(response)

   }else{
    let response = {
      "status":false,
      "message":"Please send Pin request for approve",
      
    }
    resp.status(200).json(response)
   }

  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var DirectTeamList = async(req,resp)=>{
  try{
    let user_pins = await UserPin.findAll({where:{userId:req.userId}})
    user_array = []
    for(let user_pin of user_pins){
      let user = await User.findOne({where:{id:user_pin.userId}})
      let plan = await Plan.findOne({id:user_pin.planId})
      user_array.push({'id':user_pin.id,'userId':user.username,'activate_date':user_pin.activate_date,'planId':plan.plan_title,'is_active':user_pin.is_active})
    }
    let response = {
      "status":true,
      "message":"Direct team List fetched successfully",
      "data":user_array
    }
    resp.status(200).json(response)

  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var PinTranseFer = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      
      let user = await User.findOne({where:{username:req.body.transfer_from_userId}})
      const pinTransfer = {
        transfer_from_userId:user.id,
        pin:req.body.pin,
        transfer_to_userId:req.body.transfer_to_userId,
        
      }
    
   let pin =  await PinTransFer.create(pinTransfer)
   await pin.save()
    //let user_pins = await UserPin.findAll({where:{userId:req.userId}})
    let response = {
      "status":true,
      "message":"Pin transfer successfully",
      "data":pin
    }
    resp.status(200).json(response)
  }
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var GetUserBySponsers = async(req,resp)=>{
  try{
    //let user = await User.findOne({where:{id:req.userId}})
    //let user_pins = await User.findAll({where:{sponser_id:user.user_login_id}})
    let user_pins = await User.findAll()
    let response = {
      "status":true,
      "message":"User Sponser fetched successfully",
      "data":user_pins
    }
    resp.status(200).json(response)

  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var DownTeamList = async(req,resp)=>{
  try{
    let user = await User.findOne({where:{id:req.userId}})
    let user_levels = await UserLevel.findAll({where:{parent_user_id:user.user_login_id}})
    let array_user = []
    for( let user_pin of user_levels){
      let puser = await User.findOne({where:{user_login_id:user_pin.child_user_id}})
      let usepin = await UserPin.findOne({where:{userId:puser.id}})
      let plan
      let plan_title
      let activate_date
      let status
      if (usepin){
        plan = await Plan.findOne({id:usepin.planId})
        plan_title = plan.plan_title
        activate_date = usepin.activate_date
        status = usepin.is_active
      }else{
        plan_title = ""
        activate_date = ""
        status = false
      }
      console.log('puser',usepin)
      array_user.push({'member_id':user_pin.child_user_id,'sponser_id':puser.sponser_id,'level':user_pin.level_id.length,'package':plan_title,'active_date':activate_date,'status':status})
    }
    if(user_levels){
      let response = {
        "status":true,
        "message":"User Sponser fetched successfully",
        "data":array_user
      }
      resp.status(200).json(response)
    }

  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var DirectIncome = async(req,resp)=>{
  try{
    let user_levels = await UserLevel.findAll({where:{parentId:req.userId}})
    user_array = []
    for(let user_level of user_levels){
      let user = await User.findOne({where:{id:user_level.parentId}})
      user_array.push({'user':user.username,'amount':user_level.amount,'level':user_level.level_id.length,'createdAt':user_level.createdAt})

    }
    let response = {
      "status":true,
      "message":"Direct Income successfully",
      "data":user_array
    }
    resp.status(200).json(response)
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var RewardIncome = async(req, resp)=>{
  try{
    let user = await User.findOne({where:{id:req.userId}})
    let user_reward = await User.findAll({where:{sponser_id:user.sponser_id}})
    let user_wallet = await UserWallet.findOne({where:{userId:req.userId}})
    if(user_reward.length==50){
      if(user_wallet){
        let reward_income = 10000
        let main_balance = user_wallet.balance + 10000
        await UserWallet.update({reward_income:reward_income,balance:main_balance},{where:{userId:req.userId}})
      }else{
        await UserWallet.create({reward_income:10000,balance:10000,userId:req.userId})
      }
      await RewardIncomeHistory.create({userId:req.userId,reward_income:10000})
    }else if(user_reward.length==100){
      if(user_wallet){
        let reward_income = 22000
        let main_balance = user_wallet.balance + 22000
        await UserWallet.update({reward_income:reward_income,balance:main_balance},{where:{userId:req.userId}})
      }else{
        await UserWallet.create({reward_income:22000,balance:22000,userId:req.userId})
      }
      await RewardIncomeHistory.create({userId:req.userId,reward_income:22000})
    }
    let reward_histories = await RewardIncomeHistory.findAll({where:{userId:req.userId}})
      let response = {
        "status":true,
        "message":"Reward Income successfully",
        "data":reward_histories
      }
      resp.status(200).json(response)
    
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
module.exports = {
  BuyPin,
  PinRequestList,
  PinRequestDetail,
  PinRequestApprove,
  PinUpgradeId,
  DirectTeamList,
  PinTranseFer,
  GetUserBySponsers,
  DownTeamList,
  DirectIncome,
  RewardIncome
}