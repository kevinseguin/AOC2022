const { dir } = require("console");
const fs = require("fs");
const { forEach } = require("underscore");
const _ = require("underscore")

const data = fs.readFileSync('input.txt', 'utf-8');

const lines = data.replace(/\r/g, '').split('\n')
console.log(data);

console.log('------------------')

var drive = {'root' :  []};


var curCmd;
var curFolder = [];

while(getNextCommand()) {
    var thisCmd = curCmd.split(' ')
    if (thisCmd[1] == 'cd') {
        if (thisCmd[2] == '/') {
            curFolder = ['root'];
        }
        else if (thisCmd[2] == '..') {
            curFolder.pop()
        }
        else {
            curFolder.push(thisCmd[2]);}
        }
    

    if (thisCmd[1] == 'ls') {
            var thisDir = getDirContents();

            //make folders
            _.forEach(_.filter(thisDir, f => { return f.startsWith('dir') }), l=> { 
                console.log(`make folder: ${l.split(' ')[1]}`); 
                drive[(curFolder.join('/') + '/' + l.split(" ")[1])] = []
            })

            //store files here
            _.forEach(_.filter(thisDir, f => { return _.isNumber(parseInt(f)) }), l=> {
                if (parseInt(l.split(" ")[0])) {
                    drive[curFolder.join('/')].push({name: l.split(" ")[1], size:  parseInt(l.split(" ")[0])})
                }
             })
        }
    }

    _.forEach(drive, (f,i)=> { 
        var sum =0; 
        sum= _.reduce(_.pluck(f, 'size'), (a,b) => { return a+b }, 0);
        drive[i].total = sum
   }) 

    objmap = _.map(_.keys(drive), f => { return { name: f, files: drive[f]}})

    //console.dir(objmap, {depth:null})
    console.log('---------')

    //filter for folders < 100k
    hundoKFilter = _.filter(objmap, o => { return (o.files.total) <= 100000 && o.files.total > 0});
     
    var folderNames = _.pluck(hundoKFilter,'name' );
    console.log(hundoKFilter)

    var t = [];
    _.forEach(folderNames, fn => {
        t.push(_.filter(hundoKFilter, k=> { return k.name.startsWith(fn)}))
    })

    
    var total = 0; 
    _.forEach(t, i => { _.forEach(i, k=> {
        total +=k.files.total 
      
    })}); 
   console.dir(total)
    
 

    

function getTotal(fileMap) {
    return _.reduce(_.pluck(_.pluck(fileMap, 'files'), 'total'), (a,b) => { return a+b}, 0)
}


function getNextCommand() {
    curCmd = lines.shift();
    return lines.length
}

function getDirContents() {
    var toReturn = [];
    while (!lines[0]?.startsWith('$') && lines.length){
        toReturn.push(lines.shift());
    }
    return toReturn;
}

 