const log = require('why-is-node-running'); 
const mongoose = require('mongoose'); 
const should = require('chai').should(); 
const {User,} = require('../models/User');
const keys = require('../config/keys')

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

beforeEach( (done) => {
    mongoose.connection.collections.users.drop( () => { 
    });

    const buffy = new User({ name: 'Buffy' });
    const spike = new User({ name: 'Spike' });
    const giles = new User({ name: 'Giles' });
    buffy.save().then( spike.save() ).then( giles.save() ).then( done() );
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

after( (done) => {
    mongoose.connection.close(done); 
}); 


