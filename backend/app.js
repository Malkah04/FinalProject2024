const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const User=require('./models/user.model')

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