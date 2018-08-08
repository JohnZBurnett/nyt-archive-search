const log = require('why-is-node-running'); 
const mongoose = require('mongoose'); 
const should = require('chai').should(); 
const User = require('../models/User');
const keys = require('../config/keys')

// this allegedly fixes the Mongoose promise deprecation - let's check that later
// mongoose.Promise = global.Promise; 

before((done) => {
  mongoose.connect(keys.MONGO_TEST_URI);
  mongoose.connection
    .on('error', (error) => {
        console.warn('Error', error); 
    });
    mongoose.connection.collections.users.drop( () => {
        done();
    });
}); 

describe('Creating and saving user records', () => {
    it('saves a new user', () => {
        const newUser = new User({ name: "Jimbo"}); 

         newUser.save()
          .then( () => {
              newUser.isNew.should.be.equal(false);
          })
    })
})

after( (done) => {
    mongoose.connection.close(done); 
}); 


