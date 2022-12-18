const fs = require("fs");
const { exit } = require("process");
const _ = require("underscore");

const data = fs.readFileSync("input.txt", "utf-8");

const lines = data.replace(/\r/g, "").split("\n");

class space {
  constructor(row, col) {
    this.visited = false;
    this.row = row;
    this.col = col;
    this.head = false;
    this.tail = false;
    this.start = false
  }

  display = function () {
    if (this?.start) return "S";
    else if (this?.head) return "H";
    else if (this?.tail) return "T";
    else if (this?.visited) return "X";
    else return '.'// `[${this.row},${this.col}]`;
  };
}

var grid = [];
_.times(25, (r) => {
  grid[r] = [];
  _.times(25, (c) => {
    grid[r][c] = new space(r, c);
  });
});

start_row = Math.floor(grid[0].length /2)
start_col = Math.floor(grid[0].length /2);

grid[start_row][start_col].visited = true;
grid[start_row][start_col].head = true;
grid[start_row][start_col].tail = true;
grid[start_row][start_col].start = true;

render();

 
    
mvmt = lines[m].pop().split(" ");   

head = findHead();
tail = findTail();

if (mvmt[0] == 'U' ) { expandGrid('U', mvmt[1])}
if (mvmt[0] == 'D' ) { expandGrid('D', mvmt[1])}
if (mvmt[0] == 'L' ) { expandGrid('L', mvmt[1])}
if (mvmt[0] == 'R' ) { expandGrid('R', mvmt[1])}

move(mvmt[0], mvmt[1],m); 
 

render()
 
 


var numVisited = 0;
_.each(grid, (g, idx) => {
  numVisited += _.filter(g, (el) => {
    return el.visited;
  }).length;
});

console.log(numVisited);

function move(dir, places,index) {  
 
    for (i = 0; i < places; i++) {

       
            head = findHead();
            tail = findTail();

            if (dir == "U") {
                u = head.row - 1;
                grid[head.row][head.col].head = false;
                grid[u][head.col].head = true;
            } else if (dir == "D") {
                d = head.row + 1;
                grid[head.row][head.col].head = false;
                grid[d][head.col].head = true;
            } else if (dir == "L") {
                l = head.col - 1;
                grid[head.row][head.col].head = false;
                grid[head.row][l].head = true;
            } else {
                r = head.col + 1;
                grid[head.row][head.col].head = false;
                grid[head.row][r].head = true;
            }

            head = findHead();
            distance = Math.abs(head.row - tail.row) >= 2 || Math.abs(head.col - tail.col) >= 2;
            isDiag =   Math.abs(head.row - tail.row) >= 1 && Math.abs(head.col - tail.col) >= 1;

            if (distance) {
                if (dir == "U") {
                    u_r = tail.row - 1;
                    u_c = isDiag ? head.col : tail.col;
                    grid[tail.row][tail.col].tail = false;
                    grid[u_r][u_c].tail = true;
                    grid[u_r][u_c].visited = true;
                } else if (dir == "D") {
                    d_r = tail.row + 1;
                    d_c = isDiag ? head.col : tail.col;
                    grid[tail.row][tail.col].tail = false;
                    grid[d_r][d_c].tail = true;
                    grid[d_r][d_c].visited = true;
                } else if (dir == "L") {
                    l_r = isDiag ? head.row : tail.row;
                    l_c = tail.col - 1;
                    grid[tail.row][tail.col].tail = false;
                    grid[l_r][l_c].tail = true;
                    grid[l_r][l_c].visited = true;
                } else {
                    r_r = isDiag ? head.row : tail.row;
                    r_c = tail.col + 1;
                    grid[tail.row][tail.col].tail = false;
                    grid[r_r][r_c].tail = true;
                    grid[r_r][r_c].visited = true;
                }
            } 
    } 
}

function expandGrid(direction,val) {

    var curGridWidth = grid[0].length

    if (direction == 'R') {
        _.each(grid, (g,r)=> {
            for(c = curGridWidth ; c < curGridWidth+val ; c++) {
                grid[r][c] = new space(r, c)
            } 
        }) 
        
    }
    else if (direction == 'L') {
        _.each(grid, (g,r)=> {
            for(c = 0 ; c < val ; c++) {
                grid[r].unshift(new space(r, c))
            }  
        })  
        
    }

    else if (direction == 'U') {
        for(r = 0 ; r < val ; r++) {
            grid.unshift(new Array(val))
            _.times(grid[grid.length-1].length, (c) => {
                grid[0][c] = new space(0, c);
              }); 
        } 

        
    }

    else if (direction == 'D') {
        var gridSize = grid.length+val
        for(r = grid.length ; r < gridSize ; r++) {
            grid.push(new Array(grid[0].length))
            _.times(val, (c) => {
                grid[r][c] = new space(r, c);
              }); 
        } 

      
    }
    
    resetCoords()
}

function resetCoords() {
    
    for(var thisRow = 0; thisRow < grid.length ; thisRow++ ) { 
        for(var thisCol = 0; thisCol < grid[0].length ; thisCol++ ) {  
            console.log(thisRow, thisCol)
            grid[thisRow][thisCol].row = thisRow
            grid[thisRow][thisCol].col = thisCol
        }
    }
    
    return true;
}

function findHead() {
  for (r = 0; r < grid[0].length; r++) {
    for (c = 0; c < grid.length; c++) {
      if (grid[r][c]?.head) return grid[r][c];
    }
  }
}

function findTail() {
  for (r = 0; r < grid[0].length; r++) {
    for (c = 0; c < grid.length; c++) {
      if (grid[r][c]?.tail) return grid[r][c];
    }
  }
}

function render() {
  for (r = 0; r < grid.length; r++) {
    var linebuffer = "";
    for (c = 0; c < grid[0].length; c++) {
      linebuffer += grid[r][c].display();
    }
    console.log(linebuffer);
  }
  console.log("       ");
}
