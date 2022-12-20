
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf-8');
const _ = require("underscore")
const {astar, Graph} = require('javascript-astar');
const { result } = require('underscore');
const { exit } = require('process');
var lines = data.replace(/\r/g, '').split("\n") 
 
console.table(lines)

var starts=[];

var newgrid =[]
for (var x = 0 ; x < lines.length ; x++) {
    var b = []
    for(var y = 0 ; y < lines[x].length ; y++) { 
        b.push(lines[x].charCodeAt(y)) 
        if (lines[x][y] == 'a') starts.push({x:x,y:y})
    } 
    newgrid.push(b)
}

var bestStarts = []
 
var graphWithWeight = new Graph(newgrid);
var startWithWeight; 
var endWithWeight  ; 
var resultWithWeight;

_.forEach(starts, (a,i)=> {   
    startWithWeight  = graphWithWeight.grid[a.x][a.y];
    endWithWeight    =   graphWithWeight.grid[20][107];
    resultWithWeight = astar.search(graphWithWeight, startWithWeight, endWithWeight)

    bestStarts.push(resultWithWeight.length);
   // console.log(`a #${i} ${a.x},${a.y} -${resultWithWeight.length}`)

    var outgrid = [];

    if (resultWithWeight.length) {
        for (var x = 0 ; x < lines.length ; x++) {
            var b = []
            for(var y = 0 ; y < lines[x].length ; y++) { 
                isPath = _.where(resultWithWeight, {x:x,y:y})
                b.push(isPath.length ? '.' : lines[x][y])
            } 
            outgrid.push(b.join(''))
        }

        console.table(outgrid) 
        }
})
 
console.log(_.sortBy(bestStarts).reverse())
  
 
