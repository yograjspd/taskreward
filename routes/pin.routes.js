const { request } =  require('express');
const controller =  require("../controllers/pin.controller");
const upload=require('../middleware/uploads');
const { authJwt } = require("../middleware");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/buy_pin",[authJwt.verifyToken],upload.single('pin_image'),controller.BuyPin);
    app.get("/api/pin_request_list",[authJwt.verifyToken],controller.PinRequestList);
    app.get("/api/pin_detail/:id",[authJwt.verifyToken],controller.PinRequestDetail);
    app.post("/api/approve_pin/:id",[authJwt.verifyToken],controller.PinRequestApprove);
    app.post("/api/pin_upgrade",[authJwt.verifyToken],controller.PinUpgradeId);
    app.get("/api/direct_team",[authJwt.verifyToken],controller.DirectTeamList);
    app.get("/api/get_user_sponser",[authJwt.verifyToken],controller.GetUserBySponsers);
    app.post("/api/pin_transfer",[authJwt.verifyToken],controller.PinTranseFer);
    app.get("/api/get_down_team",[authJwt.verifyToken],controller.DownTeamList);
    app.get("/api/direct_income",[authJwt.verifyToken],controller.DirectIncome);
    app.get("/api/get_reward_list",[authJwt.verifyToken],controller.RewardIncome);

}