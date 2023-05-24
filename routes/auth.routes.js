const { request } =  require('express');
const controller =  require("../controllers/auth.controller");
const { verifySignUp,authJwt } = require("../middleware");
module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
      app.post(
        "/api/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail],controller.signup
      );
      app.post("/api/auth/signin",controller.signin);
      app.post("/api/auth/signout", controller.signout);
      app.post("/api/auth/admin_signin",controller.adminsignin);
      app.post("/api/auth/change_password",[authJwt.verifyToken],controller.changePassword);

};