const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cart=new Schema(
    {
    userId:{type: Schema.Types.ObjectId, ref: 'User', required: true},
     items:[
        {
        productId:{type:Schema.Types.ObjectId, ref:'Product',required:true},
        productQuantity :{type :String , required:true},
        productPrice :{type :String , required:true}
        }
     ]
    }
)
module.exports = mongoose.model('Cart', cart);
