const _ = require('underscore')
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8');
const lines = data.replace(/\r/g, '').split("\n")

var stacks = new Array(9);
stacks.fill('')

console.clear()

for (i = 0; i < 8 ; i++ ) { 
    var thisLine = lines[i];  
    var idx =0;
    _.times(9, (n) => { 
        idx += n == 0 ? 1 : 4;
        var stackValue = thisLine[idx] 
        stacks[n] = stacks[n] += stackValue.replace(' ', '')
    } )         
    
}

// //Part 1
// console.table(stacks)

// for (l = 10 ; l < lines.length ; l++ ) {
//     var numparts = lines[l].split(' ');
//     moveCrate9000(numparts[1], parseInt(numparts[3])-1, parseInt(numparts[5])-1)
//     console.table(stacks);
// }


//Part 2
 console.log('part2')
 console.table(stacks)

for (l = 10 ; l < lines.length ; l++ ) {
    var numparts = lines[l].split(' ');
    moveCrate9001(numparts[1], parseInt(numparts[3])-1, parseInt(numparts[5])-1)
    console.table(stacks);
}






function moveCrate9000(num, from, to) {
    var cratesToMove = new Array();

    _.times(num, () => { 
        cratesToMove.unshift( stacks[from][0] );
        stacks[from] = stacks[from].substring(1,stacks[from].length);
    });

    var stringToMove = cratesToMove.toString().replaceAll(',','');

    console.log(`move ${stringToMove} from ${from+1} to ${to+1}`)
 
    stacks[to] = stringToMove + stacks[to];
 
}

function moveCrate9001(num, from, to) {
    var cratesToMove = new Array();

    _.times(num, () => { 
        cratesToMove.push( stacks[from][0] );
        stacks[from] = stacks[from].substring(1,stacks[from].length);
    });

    var stringToMove = cratesToMove.toString().replaceAll(',','');

    console.log(`move ${stringToMove} from ${from+1} to ${to+1}`)
 
    stacks[to] = stringToMove + stacks[to];
 
}

