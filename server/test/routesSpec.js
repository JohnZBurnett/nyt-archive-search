const superagent = require('superagent');
const expect = require('chai').expect; 

describe('express rest API server', () => {
    let id; 

    it('retrieves a collection from the DB', async function() {
        this.timeout(50000); 
        let result = await superagent.get('http://localhost:5000/articles');
        expect(result.body.length).to.be.above(0); 
        console.log("RESULT 0", result.body[0]); 
    })
})