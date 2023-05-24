const { request } =  require('express');
const controller =  require("../controllers/plan.controller");
const { authJwt } = require("../middleware");
module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/plan_list",[authJwt.verifyToken],controller.GetPlanList);
    app.post("/api/plan_create",[authJwt.verifyToken],controller.PlanCreate);
    app.put("/api/plan_update/:id",[authJwt.verifyToken],controller.PlanUpdate);
    app.get("/api/get_plan/:id",[authJwt.verifyToken],controller.GetPlanDetail);
    app.delete("/api/delete_plan/:id",[authJwt.verifyToken],controller.DeletePlan);
}