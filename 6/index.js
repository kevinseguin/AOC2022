const fs = require("fs");
const { exit } = require("process");
const _ = require('underscore')
const data = fs.readFileSync('input.txt', 'utf-8');
 
console.log(data);

var part1result,part2result;

//part 1
_.forEach(data, (c, i) => {
    var nextfour = data.slice(i, i+4);
    
    if (_.uniq(nextfour).length == 4 && !part1result) {
        part1result = i+4;
        
    }
   
})


//part 2
_.forEach(data, (c, i) => {
    var nextfour = data.slice(i, i+14);
    if (_.uniq(nextfour).length == 14 && !part2result) {
        part2result = i+14
    }
  
})

console.log(part1result, part2result)