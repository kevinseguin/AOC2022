
const _ = require('underscore')
const fs = require('fs');
const data = fs.readFileSync('input.test', 'utf-8');
const lines = data.replace(/\r/g, '').split("\n")

var pairs = [{left:{}, right:{}, ordered:false, index:0}]
var els = []
console.log(lines)

index = 0;
    
function extractElements(left,right) {  
    els = [] 
 
    if (left.length == 0) { return true; }
    if (right.length == 0) { return false;  } 

    for (idx = 0 ; idx <  left.length  ; idx++) {
        els.push([_.isNumber(left[idx]) ? [left[idx]] : left[idx] ?? [], _.isNumber(right[idx]) ? [right[idx]] : right[idx] ?? []])
    }
    return null;

}

function compare(idx) {
    for(e = 0 ; e < els.length ; e++) {
        if (_.isArray(els[e][0]) && _.isArray(els[e][1])) {
            cmpArrays = compareArrays(els[e][0], els[e][1])
            if (cmpArrays == null) {
                pairs[idx].ordered = true; 
                return;
            } else {
                pairs[idx].ordered = cmpArrays; 
            }
            continue;
        }

        if (els[e][0] > els[e][1]) {
            continue;
        }

        if (els[e][0] < els[e][1]) {
            pairs[idx].ordered = false;
            return;
        }

        pairs[idx].ordered = true;  
    }
}

function compareArrays(a,b) {   

    if (!a.length && b.length) {
        return true
    }
    if (a.length && !b.length) {
        return false
    }

    while(Math.abs(a.length-b.length)) {
        if (a.length==0 && b.length) {
            return true
        }
        if (a.length && b.length==0) {
            return false
        }
 
        if (a[0] > b[0]) {
            return false; 
        }
        a.shift();
        b.shift();
       
    }
    return null;
}

fillpairs = function() {
    index++;
    if (lines.length ==0) return
    pairs[index-1] = {}
    pairs[index-1].left = eval(lines.shift())
    pairs[index-1].right = eval(lines.shift())
    pairs[index-1].index = index;
    lines.shift()
    fillpairs();
}
fillpairs();
  

for(p = 0 ; p < pairs.length ; p++ ) {
    
    pair = pairs[p]; 
        
    console.log('')
    console.log(`--index: ${p+1}---`)
    e = extractElements(pair.left,pair.right)
    if (e!=null) { 
        pairs[p].ordered = e; 
    }
    console.table(els)
    if (e==null) compare(p);
    console.log(pairs[p])
    console.log(`--index: ${p+1}---`)
    //If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order.
    //If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order.
    //If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. 
    //For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].

    // for(idx = 0 ; idx < pair.left.length ; idx++) {

    //     //both integers
    //     if(_.isNumber(pair.left[idx]) && _.isNumber(pair.right[idx])) {
    //         if (pair.left[idx] > pair.right[idx]) { 
    //             pair.ordered = false; 
    //             continue; 
    //         }
    //         else {
    //             pair.ordered = true;
    //         } 
    //     }

    //     //mixed - numbers / arrays left v right
    //     else if (_.isNumber(pair.left[idx]) && _.isArray(pair.right[idx])) {
    //         if (pair.left[idx] < pair.right[0]) {
    //             pair.ordered = true;
    //         } 
    //         else {
    //             pair.ordered = false;
    //             continue;
    //         }

    //     }
    //       //mixed - numbers / arrays right v left
    //     else if (_.isArray(pair.left[idx]) && _.isNumber(pair.right[idx])) {
    //         if (pair.left[0] < pair.right[idx]) {
    //             pair.ordered = true;
    //         } 
    //         else {
    //             pair.ordered = false;
    //             continue;
    //         }
    //     }

    //     //both arrays 
    //     else if (_.isArray(pair.left[idx]) && _.isArray(pair.right[idx])) {
    //         if (pair.left[idx].length < pair.right[idx].length) {
    //             pair.ordered = true;
    //         } 
    //         if (pair.left[idx].length > pair.right[idx].length) {
    //             pair.ordered = false;
    //             continue;
    //         } 
    //         else if (pair.left[idx].length == pair.right[idx].length) {
    //             for(sp = 0; sp < pair.left[idx].length ; sp++) {
    //                     if (pair.left[idx][sp] > pair.right[idx][sp]) { 
    //                         pair.ordered = false; 
    //                         continue; 
    //                     }
    //                     else {
    //                         pair.ordered = true;
    //                     } 
    //                 }
    //             } 
    //         }  
    //     } 
    }  
  

 console.table(pairs)