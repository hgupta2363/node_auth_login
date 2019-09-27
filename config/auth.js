var User=require("../models/db")

var ensureAuthenticated=function(req,res,next){
    if(req.Cookies.email){
        console.log(typeof req)
       return next();
    }
    else
    res.redirect("/user/login")
}
module.exports={
    ensureAuthenticated:ensureAuthenticated
    
}