const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");
const config = require("../config/auth.config.js");
const Plan = db.plans

var GetPlanList = async(req, resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      let plans = await Plan.findAll()
      
      response = {
        "status":true,
        "message":"Game type fetched successfully",
        "data":plans
      }
      resp.status(200).json(response);

    }
  }catch(error){
    return resp.status(500).send({message:error.message});
  }
}
var PlanCreate = async(req, resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      const addPlan = {
        plan_title:req.body.plan_title,
        plan_content:req.body.plan_content,
        plan_amount:req.body.plan_amount
      }
      let data = await Plan.create(addPlan);
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
var PlanUpdate = async(req,resp)=>{
  try{
    if(!req.body){
      return resp.status(400).send({message:"Content can not be empty !"})
    }else{
      data = await Plan.update({"plan_title":req.body.plan_title,"plan_content":req.body.plan_content,"plan_amount":req.body.plan_amount},{where:{'id':req.params.id}})
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

var GetPlanDetail = async(req, resp)=>{
  try{
    let data = await Plan.findOne({where:{id:req.params.id}});
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
var DeletePlan = async(req,resp)=>{
  let data = await Plan.destroy({where:{id:req.params.id}});
  let response = {
    "status":true,
    "message":"Plan delete successfully",
    "data":data
  }
  resp.status(200).json(response)
}
module.exports = {
  GetPlanList,
  PlanCreate,
  PlanUpdate,
  GetPlanDetail,
  DeletePlan
}