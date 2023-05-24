const { request } =  require('express');
const controller =  require("../controllers/user.controller");
const { authJwt } = require("../middleware");
module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/user/:id",controller.getUserProfile);
    app.post("/api/user_update/:id",controller.updateUserProfile);
    app.post("/api/bank_detail/:id",controller.UserBankDetail);
    app.get("/api/get_bank_detail/:id",controller.getUserBankDetail);
    app.post("/api/withdraw_amount",[authJwt.verifyToken],controller.withdrawUseramount);
    app.get("/api/user_dashboard",[authJwt.verifyToken],controller.UserDashboard);

}