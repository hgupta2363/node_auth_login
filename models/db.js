var mongoose=require("mongoose")
var userSchema=mongoose.Schema({
    name:
    {
        type:String,
        
    },

    email:
    {
type:String,
unique:true,
require:true
    },
    
    password :
    {
type:String,

require:true
    },
    date: {
        type: Date,
        default: Date.now
      },
      secretKey:{
          type:String,

      },
      active:{
          type:Boolean
      }
})
module.exports=mongoose.model("user",userSchema)