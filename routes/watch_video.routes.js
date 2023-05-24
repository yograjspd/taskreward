const { request } =  require('express');
const controller =  require("../controllers/watch_video.controller");
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
    app.get("/api/watch_video_list",[authJwt.verifyToken],controller.GetWatchList);
    app.post("/api/watch_video_create",[authJwt.verifyToken],controller.WacthCreate);
    app.put("/api/watch_video_update/:id",[authJwt.verifyToken],controller.WatchUpdate);
    app.get("/api/get_watch_video/:id",[authJwt.verifyToken],controller.WatchVideoDetail);
    app.delete("/api/delete_watch_video/:id",[authJwt.verifyToken],controller.WatchDelete);
    app.post("/api/add_view_video_user",[authJwt.verifyToken],controller.AddViewUserVideo);
    app.get("/api/get_today_video",[authJwt.verifyToken],controller.getTodayVideo);
    app.post("/api/checkuser_viewed",[authJwt.verifyToken],controller.checkuserViewed);
    app.get("/api/daily_ad_income",[authJwt.verifyToken],controller.dailyAdIncome);
}