const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const User=require('./models/user.model')
const Product=require('./models/Product.model')

const mongouri ="mongodb://localhost:27017/finalproject"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res) => {
    res.send('Hello World, from final project');
});

app.post('/register', async (req, res) => {
      try{
        let userParam=req.body;
         if(await User.findOne({email : userParam.email}) ){
            res.send('email: ' + userParam.email + " is already exist") ;
         }
         const salt=await bcrypt.genSalt(10);
         userParam.password=await bcrypt.hash(userParam.password,salt)

        const user = new User(userParam);
        await user.save();
        res.send("user added successfully ")
      }
      catch(err){
        res.status(500).json({error: err.message})
      }
})

app.post('/login', async (req, res) => {
  try{
    if(!req.body.email ||!req.body.password) return res.status(400).send('email and password must be provided')
    const user=await User.findOne({email : req.body.email})
    if(!user) return res.status(400).send('email or password is wrong')
    const validPass=await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('email or password is wrong')
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
     
      
      if (await Product.findOne({ id: productParam.id })) {
          res.send( 'productId "' + productParam.id + '" is already exist');
          return;
      }

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