const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const User=require('./models/user.model')
const Product=require('./models/Product.model')
const Cart=require('./models/cart.model')
const mongouri ="mongodb://localhost:27017/finalproject"

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res) => {
    res.send('Hello World, from final project');
});

app.post('/register', async (req, res) => {
      try{
        let {first,second ,email ,password} = req.body
        if(!first ||!second||!email ||!password) return res.status(400).json({erorr:'All fields must be provided'})
        
         if(await User.findOne({email}) ){
            res.status(400).json({error:`this ${email} is already exist`}) 
         }
         if(password.trim()==='')res.json('password cannot be empty')
         if(password.length <8)res.json('password must be at least 8 characters')
          if(password.length<20)res.json('password cannot exceed 20 characters')
         const salt=await bcrypt.genSalt(10);
         password=await bcrypt.hash(password,salt)

        const user = new User(...req.body,password);
        await user.save();
        res.status(200).json("user added successfully ")
      }
      catch(err){
        res.status(500).json({error: err.message})
      }
})

app.post('/login', async (req, res) => {
  try{
    if(!req.body.email ||!req.body.password) return res.status(400).json({erorr:'email and password must be provided'})
    const user=await User.findOne({email : req.body.email})
    if(!user) return res.status(400).json({error:'email or password is wrong'})
    const validPass=await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).json({erorr:'email or password is wrong'})
    res.json( 'success login')
  }
  catch(err){
    res.status(500).json({error: err.message})
  }
})




app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
}
});

app.post('/addproduct',  async (req, res) => {

  try{
      
      let productParam = req.body;
     
      
      // if (await Product.findOne({ id: productParam.id })) {
      //     res.send( 'productId "' + productParam.id + '" is already exist');
      //     return;
      // }

      const product = new Product(productParam);


        await product.save();
        res.send("product added successfully ")

  }catch(err)
  {
      res.status(500).send('server error: '+ err);
  }
  
});





app.delete('/deleteproduct', async (req, res) => { 
  
  try {

      let productParam = req.body;
      if (!productParam.id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      const deletedProduct = await Product.findByIdAndDelete(productParam.id);
      
      if(!deletedProduct){
          return res.status(404).json(`{message: cannot find any product with productId ${productParam.id}}`)
      }
      res.status(200).json({message :"product deleted succussfully",deletedProduct});
      
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
});


app.post('/editproduct', async (req,res)=>{
  try{
      
      let productParam =req.body
      if (!productParam.id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }


      const editedProduct = await Product.findById(productParam.id);
      
      if(!editedProduct){
        return res.status(404).json(`{message: cannot find any product with productId ${productParam.id}}`)
      }
      
      if(productParam.productPrice!==undefined){
          editedProduct.productPrice = productParam.productPrice
      }

      if(productParam.productQuantity!==undefined){
        editedProduct.productQuantity = productParam.productQuantity
      }
      await editedProduct.save();
      res.send("user updateded successfully ")
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.post('/adduser', async (req, res) => {
  try {

    let userParam = req.body;

    if (await User.findOne({ email: userParam.email })) {
      res.send('email "' + userParam.email + '" is already exist');
    }
    const user = new User(userParam);

    const salt = await bcrypt.genSalt(10);
    userParam.password = await bcrypt.hash(userParam.password, salt);
    user.password = userParam.password;

    await user.save();
    res.send("user added successfully ")

  } catch (err) {
    res.status(500).send('server error: ' + err);
  }
});

app.post('/addtocart', async (req, res) => {
  try {
    let { userId, productId, productQuantity } = req.body;
    if (!userId || !productId || !productQuantity) {
      return res.status(400).json({ message: 'userId, productId, and quantity are required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (productQuantity > product.productQuantity) {
      return res.status(404).json({ message: `The quantity available  ${product.productQuantity} is not enough for your order, please reorder later` });
    }
    let totalPrice = 0;
    let totalQuantity = 0;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId, items: [{ productId, productQuantity, productPrice: product.productPrice }],
        TotalPrice: product.productPrice * productQuantity,
        TotalQuantity: productQuantity
      });
      product.productQuantity = parseInt(product.productQuantity) - parseInt(productQuantity);
      await product.save();
      await cart.save();
      return res.status(200).json('Cart created and product added');
    }
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.productQuantity = (parseInt(existingItem.productQuantity) + parseInt(productQuantity)).toString();
      cart.items.forEach(item => {
        totalPrice += parseFloat(item.productPrice) * parseInt(item.productQuantity);
        totalQuantity += parseInt(item.productQuantity);
      });
      cart.TotalPrice = totalPrice;
      cart.TotalQuantity = totalQuantity;
      product.productQuantity = parseInt(product.productQuantity) - parseInt(productQuantity);
      await product.save();
      await cart.save();
      return res.status(200).json('Product quantity updated');
    } else {
      cart.items.push({ productId, productQuantity, productPrice: product.productPrice });
      cart.items.forEach(item => {
        totalPrice += parseFloat(item.productPrice) * parseInt(item.productQuantity);
        totalQuantity += parseInt(item.productQuantity);
      });
      cart.TotalPrice = totalPrice;
      cart.TotalQuantity = totalQuantity;
      product.productQuantity = parseInt(product.productQuantity) - parseInt(productQuantity);
      await product.save();
      await cart.save();
      return res.status(200).json('Product added to cart');
    }

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
app.delete('/removefromcart', async (req, res) => {
  try {
    let { userId, cartId, productId } = req.body
    if (!userId || !cartId || !productId) {
      return res.status(400).send('userId and cartId are required and productId');
    }
    let cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json("Cart not found")

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const itemProduct = cart.items.find(item => item.productId.toString() === productId);
    if (!itemProduct) return res.status(404).json(`{message: cannot find any product with productId ${productId} in cartId ${cartId}}`)

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    let totalPrice = 0;
    let totalQuantity = 0;
    cart.items.forEach(item => {
      totalPrice += parseFloat(item.productPrice) * parseInt(item.productQuantity);
      totalQuantity += parseInt(item.productQuantity);
    });
    cart.TotalPrice = totalPrice;
    cart.TotalQuantity = totalQuantity;
    product.productQuantity = parseInt(product.productQuantity) + parseInt(itemProduct.productQuantity);
    await product.save();
    await cart.save();
    return res.status(200).json("items deleted successfully")
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/getcart', async (req, res) => {
    try{
        let {userId} = req.body
        if(!userId){
            return res.status(400).json({ message: 'userId is required' });
        }
        let cart = await Cart.findOne({ userId })
        if(!cart) return res.status(404).json("Cart not found")
        res.json(cart)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/updateItem',async(req, res)=>{
  //update item by amount
  try{
    let {userId,cartId,productQuantity,productId} = req.body
    if(!userId || !cartId||!productId||!productQuantity) {
      return res.status(400).json(  'userId, cardId, productId, and productQuantity are required' );
    }
    let cart = await Cart.findById(cartId);
    if(!cart) return res.status(404).json("Cart not found")
      
    const itemProduct = cart.items.find(item => item.productId.toString() === productId);
    if(!itemProduct) return res.status(404).json("product not found")
      
    itemProduct.productQuantity = parseInt(productQuantity).toString();
    await cart.save();
    return res.status(200).send("Product quantity updated successfully" );
  }catch(e){
    res.status(500).json({ message: e.message });
  }

})

app.delete('/clearcart',async (req, res) => {
  try{
    let {userId} = req.body
    if(!userId)
      return res.status(400).send('userId is required' );
    
    const cart=await Cart.findOneAndDelete({ userId })
    if(!cart){
      return res.status(404).json("Cart not found")   
    }
    return res.status(200).json("Cart cleared successfully")
  }catch(e){
    res.status(500).json({ message: e.message });
  }
})

mongoose.set("strictQuery", false)
mongoose
.connect('mongodb://localhost:27017/finalproject')
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(7000, () => console.log('app started on port 7000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})