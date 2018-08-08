const mongoose = require('mongoose'); 
const should = require('chai').should(); 
const {User,} = require('../models/User');
const keys = require('../config/keys');

// this allegedly fixes the Mongoose promise deprecation - let's check that later
// mongoose.Promise = global.Promise; 

before((done) => {
  mongoose.connect(keys.MONGO_TEST_URI);
  mongoose.connection
    .on('error', (error) => {
        console.warn('Error', error); 
    });
    done(); 
}); 

beforeEach( async () => {
    await new User({ name: 'Buffy' }).save();
    await new User({ name: 'Spike' }).save();
    await new User({ name: 'Giles' }).save();
})

describe('Creating and saving user records', () => {
    it('saves a new user', () => {
        const newUser = new User({ name: "Jimbo"}); 

         return newUser.save()
          .then( () => {
              newUser.isNew.should.be.equal(false);
          })
    });
})

describe('Finding user records', () => {
    it('finds the existing users', () => {
        return User.find({}, function(err, docs) {
            if (!err) {
                docs.should.have.lengthOf(3);
            } else { throw err;}
        })
    })
})

afterEach( (done) => {
    mongoose.connection.collections.users.drop( () => { 
    });
    done(); 
}); 

mongoose.connection.close(); 


