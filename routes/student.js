var express=require("express")
var router=express.Router()
//var auth=require("../config/auth")
var User=require("../models/db")
//var ensureAuthenticated=(req,res,next)=>{
//    if(req.Cookies.email){
  //      console.log(typeof req)
    //   return next();
    //}
    //else
    //res.redirect("/user/login")
//}
router.get("/dashboard",(req,res,next)=>{
    if(req.signedCookies.email){
        console.log(req.signedCookies.email)
        User.findOne({email:req.signedCookies.email}).then((user,err)=>{
            console.log(user.name)
            res.render("dashboard",{user:user})
        })
    }
        else
        {
            res.redirect("/user/login")
        }


    }




)

module.exports=router