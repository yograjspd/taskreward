const { request } =  require('express');
const Sequelize = require("sequelize");
const db = require("../models/db");
const config = require("../config/auth.config.js");
const User = db.users;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const mobile_number_validate  = require("../middleware/validation.js");
const user_login_id_generate = require("../middleware/user_login_id");
const UserLevel = db.user_levels;
const LevelAmount = db.level_amounts;
const LevelAmountHistory = db.level_amount_histories;
const UserWallet = db.user_wallets;
var signup = async(req, resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
        }
        var mobile_no = req.body.mobile
        if (req.body.confirm_password!==req.body.password){
            return resp.status(200).send({message:"password and confirm password not match!",staus:false})
        }

        // var valid = mobile_number_validate(mobile_no)
        // if(!valid){
        //     return resp.status(200).send({message:"Mobile Number is not valid",status:false}) 
        // }
        // const check_user =  await User.findOne({where:{mobile:req.body.mobile},});
        // if(check_user){
        //     return resp.status(200).send({message:"User already register with is mobile number",status:false})
        // }
        //console.log("user_login_id_generate",user_login_id_generate)
        const user = {
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            password:bcrypt.hashSync(req.body.password, 8),

            sponser_id:req.body.sponser_id,
            user_login_id:user_login_id_generate()
        }
        let data = await User.create(user);
        await data.save();
        if (data.sponser_id){        
        let user_level = await UserLevel.findOne({where:{child_user_id:data.sponser_id}})
        let level_length = user_level.level_id
        if(user_level==null){
            //level 1
            const check_user =  await User.findOne({where:{user_login_id:req.body.sponser_id}});
            // await LevelAmount.create({'user_login_id':req.body.sponser_id,'level':1})
            // await LevelAmountHistory.create({'user_login_id':req.body.sponser_id,'level':1,'amount':350})
            var level_array = []
            console.log('i am into')
            level_array.push(check_user.id)
            await UserLevel.create({'parentId':check_user.id,'parent_user_id':check_user.user_login_id,'child_user_id':data.user_login_id,'childId':data.id,'level_id':level_array,'amount':350})
        }else{
            
            const check_first_p =  await User.findOne({where:{user_login_id:req.body.sponser_id}});
            var level_array = []
            console.log('i am into')
            level_array.push(check_first_p.id)
            await UserLevel.create({'parentId':check_first_p.id,'parent_user_id':check_first_p.user_login_id,'child_user_id':data.user_login_id,'childId':data.id,'level_id':level_array,'amount':350})
            if (user_level.parent_user_id){
                const check_second_p =  await User.findOne({where:{user_login_id:user_level.parent_user_id}});
                let level_array2 = user_level.level_id
                level_array2.push(check_first_p.id)
                await UserLevel.create({'parentId':check_second_p.id,'parent_user_id':check_second_p.user_login_id,'child_user_id':user_level.child_user_id,'childId':user_level.childId,'level_id':level_array2,'amount':100}) 
                if(check_second_p.sponser_id){
                    level_array2.push(check_second_p.id)
                    const check_third_p =  await User.findOne({where:{user_login_id:check_second_p.sponser_id}});
                    await UserLevel.create({'parentId':check_third_p.id,'parent_user_id':check_third_p.user_login_id,'child_user_id':check_second_p.user_login_id,'childId':check_second_p.id,'level_id':level_array2,'amount':90})
                    if(check_third_p.sponser_id){
                        level_array2.push(check_third_p.id)
                        const check_fourth_p =  await User.findOne({where:{user_login_id:check_third_p.sponser_id}});
                        await UserLevel.create({'parentId':check_fourth_p.id,'parent_user_id':check_fourth_p.user_login_id,'child_user_id':check_third_p.user_login_id,'childId':check_third_p.id,'level_id':level_array2,'amount':80})
                        if(check_fourth_p.sponser_id){
                            level_array2.push(check_fourth_p.id)
                            const check_fifth_p =  await User.findOne({where:{user_login_id:check_fourth_p.sponser_id}});
                            await UserLevel.create({'parentId':check_fifth_p.id,'parent_user_id':check_fifth_p.user_login_id,'child_user_id':check_fourth_p.user_login_id,'childId':check_fourth_p.id,'level_id':level_array2,'amount':70})
                            if(check_fifth_p.sponser_id){
                                level_array2.push(check_fifth_p.id)
                                const check_sixth_p =  await User.findOne({where:{user_login_id:check_fifth_p.sponser_id}});
                                await UserLevel.create({'parentId':check_sixth_p.id,'parent_user_id':check_sixth_p.user_login_id,'child_user_id':check_fifth_p.user_login_id,'childId':check_fifth_p.id,'level_id':level_array2,'amount':50})
                                if(check_sixth_p.sponser_id){
                                    level_array2.push(check_sixth_p.id)
                                    const check_seven_p =  await User.findOne({where:{user_login_id:check_sixth_p.sponser_id}});
                                    await UserLevel.create({'parentId':check_seven_p.id,'parent_user_id':check_seven_p.user_login_id,'child_user_id':check_sixth_p.user_login_id,'childId':check_sixth_p.id,'level_id':level_array2,'amount':20})
                                    if(check_seven_p.sponser_id){
                                        level_array2.push(check_seven_p.id)
                                        const check_eight_p =  await User.findOne({where:{user_login_id:check_seven_p.sponser_id}});
                                        await UserLevel.create({'parentId':check_eight_p.id,'parent_user_id':check_eight_p.user_login_id,'child_user_id':check_seven_p.user_login_id,'childId':check_seven_p.id,'level_id':level_array2,'amount':10})
                                        if(check_eight_p.sponser_id){
                                            level_array2.push(check_eight_p.id)
                                            const check_nine_p =  await User.findOne({where:{user_login_id:check_eight_p.sponser_id}});
                                            await UserLevel.create({'parentId':check_nine_p.id,'parent_user_id':check_nine_p.user_login_id,'child_user_id':check_eight_p.user_login_id,'childId':check_eight_p.id,'level_id':level_array2,'amount':10})
                                            if(check_nine_p.sponser_id){
                                                level_array2.push(check_nine_p.id)
                                                const check_ten_p =  await User.findOne({where:{user_login_id:check_nine_p.sponser_id}})
                                                await UserLevel.create({'parentId':check_ten_p.id,'parent_user_id':check_ten_p.user_login_id,'child_user_id':check_nine_p.user_login_id,'childId':check_nine_p.id,'level_id':level_array2,'amount':5})

                                            }
                                        }
                                        

                                    }

                                }

                            }
                        }


                    }
                }

            }


        }
        }
        let response = {
            "status":true,
            "message":"User Signup Successfully",
            "data":data
            }

        resp.status(200).json(response);
    }catch(error){
        console.log(error);
        return resp.send(`Error when trying to submit the Parent details:${error}`);
    }
}
var signin = async(req,resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
        }else{
            let user = await User.findOne({where:{user_login_id:req.body.user_login_id}})
            if(!user){
               return resp.status(500).send({message:"User Not found !",status:false}) 
            }else{
                let user_password = user.password
                let password = req.body.password
                bcrypt.compare(password,user_password,function(err,result){
                    if(result){
                        let token = jwt.sign({id:user.id},config.secret,)
                        let user_data = {'id':user.id,'token':token,'username':user.username,'email':user.email,'mobile':user.mobile,'user_login_id':user.user_login_id,'user_type':user.user_type}
                        let response = {
                            "status":true,
                            "message":"User login successfully",
                            "data":user_data
                        }
                        resp.status(200).json(response)
                    }else{
                        return resp.status(500).send({ message:"Password Not Match" ,staus:false});
                        console.log('error',err)
                    }
                })
            }

        }

    }catch(error){
        return resp.status(500).send({message:error.message});
    }
}
var adminsignin = async(req,resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
        }else{
            let user = await User.findOne({where:{username:req.body.username}})
            if(!user){
               return resp.status(500).send({message:"User Not found !",status:false}) 
            }else{
                let user_password = user.password
                let password = req.body.password
                bcrypt.compare(password,user_password,function(err,result){
                    if(result){
                        let token = jwt.sign({id:user.id},config.secret,)
                        let user_data = {'id':user.id,'token':token,'username':user.username,'email':user.email,'mobile':user.mobile,'user_login_id':user.user_login_id,'user_type':user.user_type}
                        let response = {
                            "status":true,
                            "message":"admin login successfully",
                            "data":user_data
                        }
                        resp.status(200).json(response)
                    }else{
                        return resp.status(500).send({ message:"Password Not Match" ,staus:false});
                        console.log('error',err)
                    }
                })
            }

        }

    }catch(error){
        return resp.status(500).send({message:error.message});
    }
}

var signout = async(req,resp)=>{  
    let token = req.headers["x-access-token"]; 
    try {
      req.session = null;
      resp.clearCookie("x-access-token");   
      return resp.status(200).send({
        message: "You've been signed out!"
      });    
    } catch (err) {
      console.log(err)
      
    }
  }
var changePassword = async(req,resp)=>{
    try{
        if(!req.body){
            return resp.status(400).send({message:"Content can not be empty !"})
        }else{
            if(req.body.new_password!=req.body.confirm_password){
                return resp.status(200).send({message:"Password and Confirm Password not match",status:false})
            }else{            
            let user = await User.findOne({where:{id:req.userId}})
            console.log('user',user)
            let user_password = user.password
            let old_password = req.body.old_password
            bcrypt.compare(old_password,user_password,function(err,result){
                let new_password = bcrypt.hashSync(req.body.new_password, 8)
                let data =  User.update({password:new_password},{where:{id:req.userId}});
                let response = {
                    "status":true,
                    "message":"Password change successfully",
                    "data":data
                }
                resp.status(200).json(response)
            })
        }

        }
    }catch(error){
        return resp.status(500).send({message:error.message});
    }
}
module.exports = {
    signup,
    signin,
    signout,
    adminsignin,
    changePassword
}