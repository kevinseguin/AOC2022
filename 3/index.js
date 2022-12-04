const { group } = require('console');
const fs = require('fs');
const _ = require('underscore')
const data = fs.readFileSync('input.txt', 'utf8');

const lines = data.replace(/\r/g, '').split('\n');

const chars = ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k', 'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const letterVals = [];

var sumOfItems = 0;
var sumOfPart2Items = 0;

for (c = 0; c < chars.length ; c++) {
    letterVals.push({'char':chars[c], val: c+1});
} 

//Part 1
console.log(letterVals);

// for (i = 0 ; i < lines.length ; i++) {
//     var package = lines[i];
//     var packageSize = package.length;
//     var leftHalf  = package.substring(0,packageSize/2);
//     var rightHalf = package.substring(packageSize/2, packageSize)
//     console.log(package, packageSize, leftHalf, rightHalf);

//     const commonItem = findCommonItem(leftHalf,rightHalf)
//     console.log(commonItem);

//     const val = getValueOfItem(commonItem);
//     console.log(val);

//     sumOfItems += val;
// }

// const part1Answer = sumOfItems;



//Part 2
const groupsOfThree = _.chunk(lines, 3);
 

for (p2 = 0; p2 < groupsOfThree.length ; p2++) {
    const p2CommonItem = findCommonItem(groupsOfThree[p2][0], groupsOfThree[p2][1],groupsOfThree[p2][2]);
    
    const p2Val = getValueOfItem(p2CommonItem);
    console.log(groupsOfThree, p2CommonItem, p2Val)
    sumOfPart2Items += p2Val;

    
}
console.log(sumOfPart2Items)


function findCommonItem(leftHalf, rightHalf, ...more) {
    return _.intersection(_.toArray(leftHalf), _.toArray(rightHalf), ...more || null )
}

function getValueOfItem(item) {
    return _.filter(letterVals, f=> { return f.char == item})[0].val;

}