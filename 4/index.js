
const _ = require('underscore')
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8');

const lines = data.replace(/\r/g, '').split("\n")
 

var howManyFit = 0
var howManyOverlapAtAll = 0;

for (i = 0 ; i < lines.length ; i++ ) {
    var thisLine = lines[i];
    var range = getRange(thisLine); 
    var allNumbers = thisLine.replace(/\-/g, ',').split(',');
    var toCompare = []; 

    var vizLine1 = new Array(100).fill('.') 
    var vizLine2 = new Array(100).fill('.')
  
    var firstRangeSize = eval(thisLine.split(',')[0])*-1  
    var secondRangeSize = eval(thisLine.split(',')[1])*-1  

    console.log()

    if (firstRangeSize < secondRangeSize) {
        toCompare = thisLine.split(',').reverse();
    }
    else {
        toCompare = thisLine.split(',');
    }

    for (j = parseInt(toCompare[0].split('-')[0])-1 ; j < parseInt(toCompare[0].split('-')[1]) ; j++ ) {
        vizLine1[j] = 'x'
    }
    
    for (k = parseInt(toCompare[1].split('-')[0])-1 ; k < parseInt(toCompare[1].split('-')[1]) ; k++ ) {
        vizLine2[k] = 'x'
    }

    console.log(vizLine1.toString().replace(/\,/g, ''))
    console.log(vizLine2.toString().replace(/\,/g, ''))

    if (parseInt(toCompare[1].split('-')[0]) >= parseInt(toCompare[0].split('-')[0]) && parseInt(toCompare[1].split('-')[1]) <= parseInt(toCompare[0].split('-')[1])) {
        console.log(i, toCompare, 'fits')
        howManyFit++;
    }
    else {
        console.log(i, toCompare, 'no fits')
    }

    //Part 2
    var range1 = _.range(parseInt(toCompare[0].split('-')[0]),parseInt(toCompare[0].split('-')[1])+1)
    var range2 = _.range(parseInt(toCompare[1].split('-')[0]),parseInt(toCompare[1].split('-')[1])+1)
    console.log(range1, range2)
    var intersect = _.intersection(range1,range2);

    if (intersect.length) { console.log('overlaps'); howManyOverlapAtAll++;  }
    else {
         console.log('no overlap', intersect)
    }

 
 
}

console.log(howManyFit)
console.log(howManyOverlapAtAll)



//51-92,41-5
function getRange(ranges) {
    let val = ranges.replace(/\-/g, ',').split(',');
    return {min:_.min(val, t=> { return parseInt(t)}), max:_.max(val, m => { return parseInt(m);})}
}
 