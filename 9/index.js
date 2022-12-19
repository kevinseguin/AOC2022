const fs = require("fs");
const { exit } = require("process");
const _ = require("underscore");

const data = fs.readFileSync("part2.txt", "utf-8");

const lines = data.replace(/\r/g, "").split("\n");

var movements = [];
class space {
  constructor(row, col, visited = null, tail= null, head=null, segment=null) {
    this.visited = visited || false ;
    this.pos = {row : row, col : col };
    this.head = head || false;
    this.tail = tail || false;
    this.segment = segment || null 
    this.segments = []
  } 

  display = function () {
    
    if (this?.start) return "S";
    else if (this?.head) return "H";
    else if (this?.tail) return "X";
    else if (this.segment) return this.segment; 
    else return '.'// `[${this.row},${this.col}]`;
  };
}
   
var grid = [];
_.times(50, (r) => {
  grid[r] = [];
  _.times(50, (c) => {
    grid[r][c] = new space(r, c);
  });
});




var segments = []

var spaces = []
 

segments.push(new space(0,0,false, false, true));

_.times(9, s=> { 
    segments.push(new space(0,0, false, false,false,s+1))
})
 
segments.push(new space(0,0,false, true));
 

 
// for(m = 0; m < lines.length ; m++){
//     mvmt = lines[m].split(" ");     
//     move(mvmt[0], mvmt[1],m);   
//   render()
// } 

 
  

function move(dir, places,index) {  
   
   //  grid[segments[0].pos.row][segments[0].col] = new space(segments[0].pos.row, segments[0].pos.col)
 
    for (i = 0; i < places; i++) { 
        if (dir == "U") {
            segments[0].pos.row -= 1;
        } else if (dir == "D") {
            segments[0].pos.row += 1;
        } else if (dir == "L") {
            segments[0].pos.col -= 1;
        } else {
            segments[0].pos.col += 1;
        }  
         

        for (seg = 1 ; seg <  segments.length ; seg++ ) {   
        
            distance = Math.abs(segments[seg-1].pos.row - segments[seg].pos.row) >= 2 || Math.abs(segments[seg-1].pos.col - segments[seg].pos.col) >= 2  
            isDiag =   Math.abs(segments[seg-1].pos.row - segments[seg].pos.row) >= 1 && Math.abs(segments[seg-1].pos.col - segments[seg].pos.col) >= 1  
            
            nextDir = ''  

            if      (segments[seg-1].pos.row < segments[seg].pos.row) {nextDir = 'U';}
            else if (segments[seg-1].pos.row > segments[seg].pos.row) {nextDir = 'D';}
            else if (segments[seg-1].pos.col < segments[seg].pos.col) {nextDir = 'L';}
            else if (segments[seg-1].pos.col > segments[seg].pos.col) {nextDir = 'R';}
                
            if (distance) {
                if (nextDir == "U") {
                    segments[seg].pos.row -= 1;
                    segments[seg].pos.col = isDiag ? segments[seg-1].pos.col : segments[seg].pos.col;
                    
                } else if (nextDir == "D") {
                    segments[seg].pos.row += 1;
                    segments[seg].pos.col = isDiag ? segments[seg-1].pos.col : segments[seg].pos.col;
                    
                } else if (nextDir == "L") {
                    segments[seg].pos.row = isDiag ? segments[seg-1].pos.row : segments[seg].pos.row;
                    segments[seg].pos.col -= 1;
                    
                } else {
                    segments[seg].pos.row = isDiag ? segments[seg-1].pos.row : segments[seg].pos.row;
                    segments[seg].pos.col += 1;
                    
                } 
                
            }  
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
 