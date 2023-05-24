const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");
const config = require("../config/auth.config.js");
const WatchVideo = db.watch_videos;
const UserWatchVideo = db.user_watch_video;
const UserWallet = db.user_wallets;
const Op = Sequelize.Op;
const DailyAdIncome = db.daily_ad_income_histories;
const User = db.users;
var GetWatchList = async(req, resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
          }else{
            let watch_videos = await WatchVideo.findAll()            
            response = {
              "status":true,
              "message":"Watch Video fetched successfully",
              "data":watch_videos
            }
            resp.status(200).json(response);
      
          }
    }catch(error){
    return resp.status(500).send({message:error.message});
  }    
}
var WacthCreate = async(req, resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
        }else{
        const addWatch = {
            video_url:req.body.video_url,
            video_date:req.body.video_date,                
        }
        let data = await WatchVideo.create(addWatch);
        await data.save()
        let response = {
        "status":true,
        "message":"Plan Create successfully",
        "data":data
        }
        resp.status(200).json(response)        
        }
    }catch(error){
    return resp.status(500).send({message:error.message});
  }   
}
var WatchUpdate = async(req,resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
          }else{
            data = await WatchVideo.update({"video_url":req.body.video_url,"video_date":req.body.video_date,},{where:{'id':req.params.id}})
            let response = {
                "status":true,
                "message":"Paln Update Successfully",
                "data":data
              }
              resp.status(200).json(response);
          }
    }catch(error){
    return resp.status(500).send({message:error.message});
  }   
}
var WatchVideoDetail = async(req,resp)=>{
    try{
        let data = await WatchVideo.findOne({where:{id:req.params.id}});
        let response = {
          "status":true,
          "message":"Plan detail successfully",
          "data":data
        }
        resp.status(200).json(response)
    }catch(error){
    return resp.status(500).send({message:error.message});
  }  
}
var WatchDelete = async(req,resp)=>{
    try{
        let data = await WatchVideo.destroy({where:{id:req.params.id}});
        let response = {
            "status":true,
            "message":"Plan delete successfully",
            "data":data
        }
        resp.status(200).json(response)
    }catch(error){
        return resp.status(500).send({message:error.message});  
    }
}
var AddViewUserVideo = async(req,resp)=>{
    try{
      if(!req.body){
        return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      let NOW = new Date();
      const addViewUser = {
        videoId:req.body.videoId,
        userId:req.userId        
      }
      let user_watch = await UserWatchVideo.create(addViewUser);
      await user_watch.save()
      let user_wallet = await UserWallet.findOne({where:{userId:req.userId}})
      if(user_wallet){
        let view_income = user_wallet.watch_income+200
        let main_balance = user_wallet.balance + 200
        await UserWallet.update({watch_income:view_income,balance:main_balance},{where:{userId:req.userId}})
      }else{
        await UserWallet.create({watch_income:200,balance:200,userId:req.userId})
      }
      await DailyAdIncome.create({userId:req.userId,watch_income:200})
      console.log('user_watch',user_watch)
      let response = {
        "status":true,
        "message":"Watch Create successfully",
        "data":user_watch
        }
        resp.status(200).json(response) 
    }
    }catch(error){
        return resp.status(500).send({message:error.message});  
    }
}
var getTodayVideo = async(req,resp)=>{
  try{
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();
    let data = await WatchVideo.findOne(
      {
        where:{
          video_date:{            
              [Op.gt]: TODAY_START,
              [Op.lt]: NOW            
          }
        }     
      });
      //console.log('thhhhhh',data)
    let user_video = await UserWatchVideo.findOne({where:{videoId:data.id,userId:req.userId}});
    if(user_video){
      let response = {
        "status":false,
        "message":"Video already watched",
        "data":{}
      }
      resp.status(200).json(response)

    }else{
      let response = {
        "status":true,
        "message":"Today detail successfully",
        "data":data
      }
      resp.status(200).json(response)
    }
    
}catch(error){
return resp.status(500).send({message:error.message});
}  

}
var checkuserViewed = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
  }else{
    let user_video = await UserWatchVideo.findOne({where:{videoId:req.body.videoId,userId:req.userId}});
    if(user_video){
      let response = {
        "status":true,
        "message":"user already viewed",
        "data":{'video_viewed':true}
      }
      resp.status(200).json(response)
    }
  }
  }catch(error){
    return resp.status(500).send({message:error.message});
  } 
}
var dailyAdIncome = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
  }else{
    let user_incomes = await DailyAdIncome.findAll({where:{userId:req.userId}});
    console.log('daily income', user_incomes)
    user_array = []
    if(user_incomes){
      for(let user_income of user_incomes){
        let user = await User.findOne({where:{id:user_income.userId}})
        user_array.push({'userId':user.username,'createdAt':user_income.createdAt,'updatedAt':user_income.updatedAt,'watch_income':user_income.watch_income})

      }
      let response = {
        "status":true,
        "message":"user ad income viewed",
        "data":user_array
      }
      resp.status(200).json(response)
    }else{
      let response = {
        "status":true,
        "message":"user Ad Income not found",
        "data":[]
      }
      resp.status(200).json(response)
    }
  }
  }catch(error){
    return resp.status(500).send({message:error.message});
  } 
}
module.exports = {
    GetWatchList,
    WacthCreate,
    WatchUpdate,
    WatchVideoDetail,
    WatchDelete,
    AddViewUserVideo,
    getTodayVideo,
    checkuserViewed,
    dailyAdIncome
}