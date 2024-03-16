const express = require('express');
const app= express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


//connect to mongoose
mongoose.connect('mongodb+srv://sumedhbhatkar80:mPqt9HvRshpHGa9r@Cluster0.eapj2k8.mongodb.net/PKTP?retryWrites=true&w=majority');

//create dataschema
const userSchema={
     name:String,
      email:String, 
      phoneNumber:Number,
      Message:String,
      subject:String,}

const User=mongoose.model("Users",userSchema);

app.get("/",(req, res)=>{
     res.sendFile(__dirname+"/index.html");
    })
app.get("/index1.html",(req, res)=>{
         res.sendFile(__dirname+"/index1.html");
    })

//Middleware for data validation
const validateFormData=(req, res, next)=>{
     const phoneNumber= req.body.phoneNumber;

     //check if number has exactly 10 digits and no space
    if(/^\d{10}$/.test(phoneNumber)){
         next();
        }
     else{ 
        res.status(400).send(res.send('<script>alert("Enter correct phone number");window.location.href="/";</script>'));
    }}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//route for submission
 app.post("/", validateFormData,(req,res)=>{
     const phoneNumber= req.body.phoneNumber;

     //check if phone number already exists in the db  
 User.findOne({phoneNumber:phoneNumber})
  .then(existingFormData=>{
     if(existingFormData){
         res.send('<script>alert("phone number already exists. You cannot proceed.");window.location.href="/";</script>')
          //res.sendFile(__dirname+"/failed.html")       
         }else{
            console.log(req)
             //phone number doesnot exist, save the formdata to mongodb         
               let newUser= new User({
                name:req.body.name,
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                Message:req.body.message, subject:req.body.subject,})
                newUser.save();

                res.redirect("/index1.html");
 }})})
 app.listen(3000,()=>{
     console.log("server is running ");
    })