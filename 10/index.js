const fs = require("fs");
const {exit } = require("process");
const _ = require('underscore')
const data = fs.readFileSync('input.txt', 'utf-8');

const ops = data.replace(/\r/g, '').split('\n')

console.log(ops)

var output = []

var V = 1;

var opStack = []
var tickCnt =0;

for(i=0;i<ops.length;i++) {
    op = ops[i].split(' ');
    if (op[0] == 'addx') {
        opStack.push({op: 'start', val:0})
        opStack.push({op: 'during', val:parseInt(op[1])})
    } else {
        opStack.push({op: 'noop', val:0})
    }
}
 

var linebuffer ='' 

 

function register(where,pos) { 
    var out = new Array(40).fill('.',0)
    out[where] = '#'
    out[where-1] = '#' 
    out[where+1] = '#'
 //   console.log(out.join(''),where, V, pos)
    return out
}

  
console.log(opStack)

setInterval(() => { 
    tickCnt++;   

    if (_.range(1,41).includes(tickCnt)) {
    linebuffer += register(V, tickCnt-1)[tickCnt-1] == '#' ? '#' : '.'
    }
    if (_.range(41,81).includes(tickCnt)) {
        linebuffer += register(V,tickCnt-41)[tickCnt-41] == '#' ? '#' : '.'
    }
    if (_.range(81,121).includes(tickCnt)) {
        linebuffer += register(V,tickCnt-81)[tickCnt-81] == '#' ? '#' : '.'
    }
    if (_.range(121,161).includes(tickCnt)) {
        linebuffer += register(V, tickCnt-121)[tickCnt-121] == '#' ? '#' : '.'
    }
    if (_.range(161,201).includes(tickCnt)) {
        linebuffer += register(V,tickCnt-161)[tickCnt-161] == '#' ? '#' : '.'
    }
    if (_.range(201,241).includes(tickCnt)) {
        linebuffer += register(V,tickCnt-201)[tickCnt-201] == '#' ? '#' : '.'
    } 

    if (tickCnt == 40) {
        console.log(linebuffer, tickCnt, V, 'here')
        linebuffer=''
    }

    if (tickCnt == 80) { 
        console.log(linebuffer, tickCnt, V, 'here')
        linebuffer=''
    }

    if (tickCnt == 120) {
        console.log(linebuffer, tickCnt, V, 'here')
        linebuffer=''
    }

    if (tickCnt == 160) {
        console.log(linebuffer, tickCnt, V, 'here')
        linebuffer=''
    }

    if (tickCnt == 200) {
        console.log(linebuffer, tickCnt, V, 'here')
        linebuffer=''
    }

    if (tickCnt == 240) {
        console.log(linebuffer, tickCnt, V, 'here')
        linebuffer=''

    }
    output.push({cnt: tickCnt, val: tickCnt, grand: V*tickCnt})
    if (opStack.length) processOp();
    else {  exit(1)}
     
}, 1)

 
function submit() {
    console.log(output[19], output[59], output[99], output[139], output[179], output[219])
    submitval = output[19].grand + output[59].grand + output[99].grand + output[139].grand + output[179].grand + output[219].grand
    console.log(`submit: ${submitval}`)
}


function processOp() {
    nextop =opStack.shift()
    V += parseInt(nextop.val)   
}



