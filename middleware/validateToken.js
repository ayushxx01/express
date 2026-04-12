const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");



const validateToken = asyncHandler(async(req,res,next)=>{
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer")){
        res.status(400);
        throw new Error();
    }

    const token = header.split(" ")[1];
//Login    → you send user info → server bakes it into token with secret → sends token back
//Request  → you send token    → server checks secret → if valid, unloads the info → done
    try{
                const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
                const user = await User.findOne({email: decoded.email}
                    ) //decode the token we have and it has all the user info 

                    if(!user){
                        res.status(401);
                        throw new Error("User does'nt exists");
                    }
                    else{
        req.user = decoded;

                    }

        next();
    }
    catch(err){
       
        throw err;
    }
})

module.exports = validateToken;