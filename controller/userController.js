const Bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async(req,res)=>{
const {username,email,password} = req.body;
if(!username || !email || !password){
    res.status(400);
    throw new Error("All fields are mandatory");
}
console.log("stage 1 passed")
const userAvail = await User.findOne({email});
if(userAvail){
    res.status(400);
    throw new Error("User already exists!");
}
console.log("stage 2 passed")
const hashedPassword = await Bcrypt.hash(password, 10);
console.log(hashedPassword)
const user = await User.create({
    username,
    email,
    password: hashedPassword
});
console.log(user)

if(!user){
    res.status(400);
    throw new Error("unable to create user")
}

res.status(201).json({Message: `User created: ${username}` })

});

const loginUser = asyncHandler(async(req,res)=>{
const {email,password} = req.body;
if(!email || !password){
    res.status(400);
    throw new Error("All fields are mandatory");
}

console.log(password);
 const user = await User.findOne({email})
 console.log(user.password);
 if(user && (await Bcrypt.compare(password, user.password))){
    const token =jwt.sign({
        username: user.username,
        email: user.email,
        id: user._id
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "10m"
    });
         if(token){
            res.status(200)
            res.json({token})
    }
    

 }

 else {
    res.status(400);
    throw new Error("booboo")
 }


});


const currentUser = asyncHandler(async(req,res)=>{
   
    res.status(200).json(req.user);

})

const deleteUser = asyncHandler(async(req,res)=>{
    const deletedUser = await User.findOneAndDelete({email: req.user.email});
    res.status(200).json(deletedUser + 'delted');

})

module.exports = {registerUser,loginUser,currentUser,deleteUser}

