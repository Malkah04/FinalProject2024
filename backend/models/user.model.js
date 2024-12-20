const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema(
    {
        first : {type:String,required:true},
        second:{type : String, required: true}, 
        email:{type : String, required: true, unique: true},
        password:{type : String, required: true},
        coins:{type : Number , required: false}
    }
)
module.exports = mongoose.model('User', userSchema);
