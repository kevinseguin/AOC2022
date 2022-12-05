const _ = require('underscore')
const fs = require('fs');
const { createInflate } = require('zlib');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.replace(/\r/g, '').split("\n")

var crateHeight = 0;
var numStacks = 0;
var instructionsStartLine = 0;

_.forEach(lines, (l,idx)=> { 
    //a crate line
    if (l[0] == '[') { crateHeight++; }

    //the count of stacks line
    if (l[1] == 1) {
        numStacks = parseInt(_.last(_.filter(l.split(' '), d=> { return parseInt(d)} )))
    }

    if (l.startsWith('move') && instructionsStartLine == 0) instructionsStartLine = idx;

})

var stacks = new Array(numStacks)
stacks.fill('') 

resetStacks(); 

// //Part 1
console.log('===PART 1===')
console.log('===START===')

console.table(stacks)


for (l = instructionsStartLine ; l < lines.length ; l++ ) {
    var numparts = lines[l].split(' ');
    moveCrate9000(numparts[1], parseInt(numparts[3])-1, parseInt(numparts[5])-1)
   
}
console.log('===END===')
console.table(stacks);

//Part 2
resetStacks()
console.log('PART 2')
console.log('===START===')
console.table(stacks)

for (l = instructionsStartLine ; l < lines.length ; l++ ) {
    var numparts = lines[l].split(' ');
    moveCrate9001(numparts[1], parseInt(numparts[3])-1, parseInt(numparts[5])-1)

}
console.log('===END===')
console.table(stacks);

 

function moveCrate9000(num, from, to) {
    var cratesToMove = new Array();

    _.times(num, () => { 
        cratesToMove.unshift( stacks[from][0] );
        stacks[from] = stacks[from].substring(1,stacks[from].length);
    });

    var stringToMove = cratesToMove.toString().replaceAll(',','');
    stacks[to] = stringToMove + stacks[to];
 
}

function moveCrate9001(num, from, to) {
    var cratesToMove = new Array();

    _.times(num, () => { 
        cratesToMove.push( stacks[from][0] );
        stacks[from] = stacks[from].substring(1,stacks[from].length);
    });

    var stringToMove = cratesToMove.toString().replaceAll(',','');
    stacks[to] = stringToMove + stacks[to];
 
}


function resetStacks() {
    stacks = new Array(numStacks);
    stacks.fill('')

    for (i = 0; i < crateHeight ; i++ ) { 
        var thisLine = lines[i];  
        var idx =0;
        _.times(numStacks, (n) => { 
            idx += n == 0 ? 1 : 4;
            var stackValue = thisLine[idx] 
            stacks[n] = stacks[n] += stackValue.replace(' ', '')
        } )         
        
    }
}
