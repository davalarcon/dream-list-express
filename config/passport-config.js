const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/userModel');

//Sve the user's ID in the bowl (called when user logs in)
passport.serializeUser((userFromDb, next)=>{
  next(null, userFromDb._id);
});


//retrieve the user's info from the DB with the ID inside the Bowl.
passport.deserializeUser((idFromBowl, next)=>{
  UserModel.findById(
    idFromBowl,
    (err, userFromDb)=>{
      if(err){
        next(err);
        return;
      }
      next(null, userFromDb);
    }
  );
});

//email and password login strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'loginEmail', //sent through AJAX from Angular
    passwordField: 'loginPassword' //sent through AJAX from Angular
  },
  (theEmail, thePassword, next)=> {
    UserModel.findOne(
      { email: theEmail },
      (err, userFromDb)=> {
        if(err){
          next(err);
          return;
        }
        if(userFromDb === null){
          next(null, false, {message: "Incorrect Email 😕"});
          return;
        }
        if (bcrypt.compareSync(thePassword, userFromDb.encryptedPassword)===false){
          next (null, false, { message: "Incorrect password 😕"});
          return;
        }
        next(null, userFromDb);
      }
    );//close UserModel.findOne()
  } // close (theEmail, thePassword, next)
));
