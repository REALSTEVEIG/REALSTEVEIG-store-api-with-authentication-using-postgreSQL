//importing modules
const bcrypt = require("bcrypt");
const User = require('../model/user')
const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes')


//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
 try {
   const { username, email, password } = req.body;
   const data = {
     username,
     email,
     password: await bcrypt.hash(password, 10),
   };
   //saving the user
   const user = await User.create(data);

   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id, username }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

     return res.status(StatusCodes.CREATED).json({user, token});
     
   } else {
     return res.status(StatusCodes.CONFLICT).json({msg : "Details are not correct"});
   }
 } catch (error) {
   console.log(error);
 }
};


//login authentication

const login = async (req, res) => {
 try {
    const { username, email, password } = req.body;

   //find a user by their email
   const user = await User.findOne({ where: {
    email: req.body.email, username : req.body.username
  }, });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id, username}, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

       //send user data
       return res.status(StatusCodes.CREATED).json({user, token})
     } else {
       return res.status(StatusCodes.UNAUTHORIZED).json({msg : "Password is incorrect"});
     }
   } else {
     return res.status(StatusCodes.UNAUTHORIZED).json({msg : "Email or username does not exist"});
   }
 } catch (error) {
   console.log(error);
 }
};

module.exports = {
 signup,
 login,
};