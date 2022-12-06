const fs = require("fs");
const { exit } = require("process");
const _ = require('underscore')
const data = fs.readFileSync('input.txt', 'utf-8');
 
console.log(data);

//part 1
_.forEach(data, (c, i) => {
    var nextfour = data.slice(i, i+4);
    console.log(`${_.uniq(nextfour)}`); 
    if (_.uniq(nextfour).length == 4) {
        console.log(i+4)
        exit(1)
    }
    else {
        console.log('not yet')
    }
})


//part 2
_.forEach(data, (c, i) => {
    var nextfour = data.slice(i, i+14);
    console.log(`${_.uniq(nextfour)}`); 
    if (_.uniq(nextfour).length == 14) {
        console.log(i+14)
        exit(1)
    }
    else {
        console.log('not yet')
    }
})
