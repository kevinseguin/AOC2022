const fs = require('fs');
const { exit } = require('process');
const _ = require('underscore')
const data = fs.readFileSync('1.txt', 'utf8');

var elvesCalories = [];
var cnt = 0;
var top3Elves = 0;

_.each(data.split('\n'), f=> { 
    if (f != '') { 
        cnt += parseInt(f);
    } 
    else { 
        elvesCalories.push(cnt); cnt = 0;
    } 
});

elvesCalories = _.sortBy(elvesCalories);
console.log(`Most Calories ${_.last(elvesCalories)}`);

_.times(3,() => { top3Elves += elvesCalories.pop(); })
console.log(`Top 3 Calories ${top3Elves}`);

exit(1);