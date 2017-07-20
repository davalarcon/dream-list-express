const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');
const router = express.Router();
const passport = require('passport');
// POST signup
router.post('/api/signup', (req, res, next)=>{
  if(!req.body.signupEmail || !req.body.signupPassword){
    res.status(400).json({ message: 'Need both email and password 💩'});
    return;
  }
  UserModel.findOne(
    { email: req.body.signupEmail },
    (err, userFromDb)=>{
        if(err){
          // 500 for server errors (nothing user can do )
          res.status(500).json({message: 'Email check went to 💩'});
          return;
        }
        if(userFromDb){
          // 400 for client errors (user need to fix something)
          res.status(400).json({ message: 'Email already exists 💩'});
          return;
        }
        const salt = bcrypt.genSaltSync(10);
        const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);
        const theUser = new UserModel({
          fullName: req.body.signupFullName,
          email: req.body.signupEmail,
          encryptedPassword: scrambledPassword
        });
        theUser.save((err) =>{
          if(err){
            res.status(500).json({ message: 'User save went to 👮🏾' });
            return;
          }
          // Automatically logs them in after sign up
          // (req.login() is defined by passport)
          req.login(theUser, (err) =>{
            if(err){
              res.status(500).json({ message: 'Login went to 💩' });
              return;
            }
            // Remove the encryptedPassword before sending
            // (not from the database, just from the object)
            theUser.encryptedPassword = undefined;
            // Send the user's information to the frontend
            res.status(200).json(theUser);
          }); // close req.login()
        }); // close theUser.save()
    }
  ); // close UserModel.findOne()
}); // close router.post('/signup'.....)


// POST login

//this is different b/c passport.authenticate() redirects
//(APIs normally shouldn't redirect)
router.post('/api/login', (req, res, next)=>{
  const authenticateFunction =
    passport.authenticate('local', (err, theUser, extraInfo)=>{
      //Errors prevented us from deciding if login was successful or not.
      if(err){
        res.status(500).json({message: 'Unknown login error 😕'});
      }
      //login failed
      if(!theUser){
        //extraInfo contains feedback messages from LocalStrategy
        res.status(401).json(extraInfo);
        return;
      }
      //login successful, save them in the session.
      req.login(theUser, (err)=>{
        if(err){
          res.status(500).json({message: 'Session save error 😕'});
          return;
        }
        // Remove the encryptedPassword before sending
        // (not from the database, just from the object)
        theUser.encryptedPassword = undefined;

        //everything worked! Send the user's info to the Client.
        res.status(200).json(theUser);
      });
    });
  authenticateFunction(req, res, next);
});


router.post('/api/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success! 🐫' });
});


router.get('/api/checklogin', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: 'Nobody logged in. 🥒' });
      return;
    }

    // Clear the encryptedPassword before sending
    // (not from the database, just from the object)
    req.user.encryptedPassword = undefined;

    res.status(200).json(req.user);
});



module.exports = router; 
