const User = require('../model/user')

const {StatusCodes} = require('http-status-codes')

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email

 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const username = await User.findOne({
     where: {
       username: req.body.username,
     },
   });
   //if username exist in the database respond with a status of 409
   if (username) {
     return res.status(StatusCodes.CONFLICT).json({msg : "username already taken"});
   }

   //checking if email already exist
   const emailcheck = await User.findOne({
     where: {
       email: req.body.email,
     },
   });

   //if email exist in the database respond with a status of 409
   if (emailcheck) {
     return res.status(StatusCodes.CONFLICT).json({msg : "Email already exists in our database"});
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 saveUser,
};
