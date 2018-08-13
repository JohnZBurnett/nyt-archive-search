const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User').User;  

passport.serializeUser( (user, done) => {
    done(null, user.id);
})

passport.deserializeUser( (id, done) => {
    User.findById(id)
      .then( user => {
          done(null, user)
      })
})

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("WE ARE IN THE LOCAL STRATEGY"); 
        User.findOne({ username: username}, function(err, user) {
            console.log("USER IS...", user); 
            if (err) { 
                return done(err); 
            }
            if (!user) { 
                return done(null, false)
            }

            if (!user.validatePassword(password)) { 
                console.log("PASSWORD DIDN'T VALIDATE!");
                return done(null, false); 
            }
            console.log("WE VALIDATED THE PASSWORD"); 
            return done(null, user); 
        })
    }
));