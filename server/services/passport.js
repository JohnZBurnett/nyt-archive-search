const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 

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
            if (err) { 
                return done(err); 
            }
            if (!user) { 
                return done(null, false)
            }

            if (!user.validatePassword(password)) { return done(null, false); }

            return done(null, user); 
        })
    }
));