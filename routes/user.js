var express = require('express');
var User=require('../models/db')
var router = express.Router();
var auth=require("../config/auth")

/* GET users listing. */
router.get('/signup', function(req, res, next) {

  res.render("sign");
});

router.post("/signup",(req,res)=>
{
  var signErrors=[]
  console.log("test")
 
  var {name,email,password,password2}=req.body
 // var name=req.body.name;
  //var email=req.body.email;
 // var password=req.body.password
  //var password2=req.body.password2
  
  if(!name||!email||!password||!password2)
  {
    signErrors.push({msg:"please enter all fields"})
  
}
 else if(password!==password2)
 signErrors.push({msg:"password do not match"})
 else if(password.length>6)
 signErrors.push({msg:"password should be less than 6 char"})
 //signErrors.forEach(function(error
 //){
//console.log(error.msg)
 //})
 if(signErrors.length>0)
 {
   res.render("sign",{
    signErrors,
    name, 
    email,
    password,
    password2



   })
  
 }

else{
  console.log(email)
  User.findOne({email:email}).then((user,err)=>{
    if(err)
    {
      console.log(err)
    }
    console.log(user)
if(user!==null)
{
  signErrors.push({msg:"typed email is already used"})
  res.render("sign",{
    signErrors,
    name,
    email,
    password,
    password2



   })
}
else
{
 
  var newUser=new User(req.body)
 console.log(newUser)
  newUser.save(function(err,user){
    if(err)
    console.log(err)
    else
    {
      req.flash(  'success_msg',
      'You are now registered and can log in')
 res.redirect("/user/login")
    }
  })
  
}

  })
}

  
})
router.get("/login",function(req,res,next){
 
  console.log("him")
  res.render("login")
})
router.post("/login",(req,res,next)=>{
  console.log("test")
  console.log(req.body.email)
User.findOne({email:req.body.email}).then((user,err)=>{
  var loginError=[]
  console.log(loginError)
if(err){
  console.log(err)
}

else if(user===null)
{
  console.log("nulltest")
  loginError.push({msg:"email is not registered"})
}
else if(user.password!==req.body.password)
{
 
 
  loginError.push({msg:"password is incorrect"})
}
else{
  res.cookie('email',user.email,{signed: true});
  res.render("dashboard",{user:user})
}
if(loginError.length>0){
  res.render("login",{loginError:loginError})
}
})
})
router.get("/logout",(req,res,next)=>
{
  
  if(req.signedCookies.email){
    res.clearCookie("email")
    req.flash({
      "error_msg":"you are successfully logout"
    })
    res.redirect("/user/login")
  //  logout.push({msg:"you are successfully logout "})
//res.render("login",{logout:logout})
  }
  else{
    // logout.push({msg:"you are not logged in"})
    //res.render("index",{logout:logout})
  }
})
module.exports = router;
