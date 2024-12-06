const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema =new Schema(
    {
        productImage:{type : String, required: true },
        productName:{type : String, required: true, unique: true}, 
        productPrice:{type : String, required: true},
        productDescription:{type : String, required: true},
        productCategory:{type : String, required: true},
        productQuantity:{type : String, required: true}
    }
)
module.exports = mongoose.model('product', productSchema);
