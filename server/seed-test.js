const axios = require('axios');

let month = 1; 

let arr = new Array(45); 
console.log(arr)

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const start = async () => {
    await asyncForEach([1, 2, 3], async (num) => {
        await waitFor(50);
        console.log(num); 
    })
    console.log('Done'); 
}


start(); 

async () => {
    let result = await axios.get(`https://api.nytimes.com/svc/archive/v1/1943/6.json`, {
        'headers': {
          'api-key': "f7aa7845a7624f2babd861b64aa6a116"
          }
        });
    console.log(result.data); 
}
axios.get('https://api.nytimes.com/svc/archive/v1/1942/6.json')