const { lookup } = require("dns");
const fs = require("fs");
const { exit } = require("process");
const _ = require("underscore")

const data = fs.readFileSync('input.txt', 'utf8')

const lines = data.replaceAll(/\r/g, '').split('\n') 

var grid = [];




_.forEach(lines, (row,rowIndex) => {
    var trees = [];
    _.each(_.toArray(row), (tree, colIndex) => { 
        trees.push({ 
            val: parseInt(tree),
            pos: { row:rowIndex, col: colIndex},
            edge: rowIndex == row.length-1 || colIndex == lines.length-1 || colIndex ==0 || rowIndex == 0,
            numTreesUp:0, numTreesLeft:0, numTreesRight:0, numTreesDown:0, maxScenicScore: 0

        })})
    grid.push(trees);
})



function lookUp(tree) { 
    var numTrees =0;
    for (var row = tree.pos.row ; row != 0 ; row--) {
        grid[tree.pos.row][tree.pos.col].numTreesUp = ++numTrees
        if (grid[tree.pos.row][tree.pos.col].val <= grid[row-1][tree.pos.col].val ) {   return false; }
    }
    return true
}

function lookDown(tree) {
    var numTrees =0;
    for (var row = tree.pos.row ; row != lines.length-1 ; ++row) {
        grid[tree.pos.row][tree.pos.col].numTreesDown = ++numTrees
        if (grid[tree.pos.row][tree.pos.col].val <= grid[row+1][tree.pos.col].val ){  return false; }
    } 
    return true
}

function lookLeft(tree)  {
    var numTrees =0;
    for (var col = tree.pos.col ; col != 0 ; col--) {
        grid[tree.pos.row][tree.pos.col].numTreesLeft = ++numTrees; 
        if (grid[tree.pos.row][tree.pos.col].val <= grid[tree.pos.row][col-1].val ) {  return false; }
    }
    return true
}

function lookRight(tree)   {
    var numTrees =0;
    for (var col = tree.pos.col ; col != grid[0].length-1 ; col++) {
        grid[tree.pos.row][tree.pos.col].numTreesRight = ++numTrees;
        if (grid[tree.pos.row][tree.pos.col].val <= grid[tree.pos.row][col+1].val ) {   return false; }
    }
    return true
}

 

let numVisible = _.filter(_.flatten(grid), t=> { return t.edge }).length

console.log(numVisible)


// for(row= 0 ; row < grid[0].length-1 ; row++) {
for(var r = 1 ; r < lines.length-1 ; r++) {
    for (var c = 1 ; c < grid[0].length-1 ; c++) {  
        var left,right,up,down;
        console.log(lines[r])
        left = lookLeft(grid[r][c]);
        right = lookRight(grid[r][c]);
        up = lookUp(grid[r][c]);
        down = lookDown(grid[r][c]); 

        grid[r][c].maxScenicScore = (grid[r][c].numTreesLeft * grid[r][c].numTreesRight * grid[r][c].numTreesUp * grid[r][c].numTreesDown)
        
        numVisible += (left||right||up||down) ? 1 : 0
        console.dir(`${JSON.stringify(grid[r][c])} up:${up}, left:${left}, down: ${down}, right:${right},  numVisible: ${numVisible}`)
    }
}

console.log(numVisible)

console.log(_.max(_.pluck(_.flatten(grid), 'maxScenicScore')))





