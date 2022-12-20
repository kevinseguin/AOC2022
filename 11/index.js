const _ = require("underscore")

class Monkeys { 

    monkeys = [];
    

    constructor(monkeys) {
        this.monkeys = monkeys
    }
 
 
}
 
class Monkey{ 

    items = []
    divtest = null;
    op = null;
    good = 0;
    bad = 0;
    index = 0;
    inspections = 0;

    constructor(items, divtest, op, index, good, bad) {
        this.items = items;
        this.divtest = divtest;
        this.op = op;
        this.index = index;
        this.good = good;
        this.bad = bad;
    } 
 

    processItems = function() {  
        var poo = []
        while (this.items.length) {
            this.inspections++;  
            var v = eval(this.op.join('')) 
            var worry = BigInt(v)
            var item = worry %=   BigInt(9699690)
            if (BigInt(item) % BigInt(this.divtest) == 0) {
                poo.push({val:item, index: this.good })
            }
            else {
                poo.push({val:item, index: this.bad })
            }
            this.items.shift()

            

        } 
        return poo
    } 
} 

//test data
var m = []
// m.push(new Monkey([79,98],23, ['BigInt(this.items[0])', '*BigInt(19)'],0, 2,3))
// m.push(new Monkey([54,65,75,74],19, ['BigInt(this.items[0])', '+BigInt(6)'],1, 2, 0 ))
// m.push(new Monkey([79,60,97],13, ['BigInt(this.items[0])', '*', 'BigInt(this.items[0])'],2, 1, 3))
// m.push(new Monkey([74],17, ['BigInt(this.items[0])', '+BigInt(3)'],3, 0, 1)) 

m.push(new Monkey([91, 54, 70, 61, 64, 64, 60, 85],2, ['BigInt(this.items[0])', '*BigInt(13)'],0, 5,2))
m.push(new Monkey([82],13, ['BigInt(this.items[0])', '+BigInt(7)'],1, 4,3))
m.push(new Monkey([84,93,70],5, ['BigInt(this.items[0])', '+BigInt(2)'],2, 5,1))
m.push(new Monkey([78,56,85,93],3, ['BigInt(this.items[0])', '*BigInt(2)'],3, 6,7))
m.push(new Monkey([64,57,81,95,52,71,58],11, ['BigInt(this.items[0])','*', 'BigInt(this.items[0])'],4, 7,3))
m.push(new Monkey([58,71,96,58,68,90],17, ['BigInt(this.items[0])', '+BigInt(6)'],5, 4,1))
m.push(new Monkey([56,99,89,97,81],7, ['BigInt(this.items[0])', '+BigInt(1)'],6, 0,2))
m.push(new Monkey([68,72],19, ['BigInt(this.items[0])', '+BigInt(8)'],7, 6,0))


var gang = new Monkeys(m);
 

for (var round = 0; round <10000; round++) { 

    for(p=0;p< gang.monkeys.length;p++) {
        var items = gang.monkeys[p].processItems();  
        
        for (var i=0 ; i<items.length ; i++) { 
            gang.monkeys[items[i].index].items.push(BigInt(items[i].val))
        }
    } 
 //   console.log(`Round ${round+1}`)
  
    
     
}

//console.dir(gang, {depth:null})
console.log(_.sortBy(_.map(gang, (m) => { return _.pluck(m, 'inspections')})[0]))


 
 
 