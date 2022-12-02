const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');

const elfPlays = {A : 'Rock', B : 'Paper', C : 'Scissors'}
const myPlays =  {X : 'Rock', Y : 'Paper', C : 'Scissors'}

var totalScore = 0;
 
const gameRows = data.split('\n');

 
//Part 1
(gameRows).forEach(game => {
    var plays = game.replace('\r', '').split(' ');
    var s = play(plays[0],plays[1]);
    totalScore += s;
});
console.log(totalScore)
 
totalScore = 0;

//Part 2
(gameRows).forEach(game => {
    var plays = game.replace('\r', '').split(' ');

    var elf = plays[0];
    var me = plays[1];
    //lose
    if (me == 'X') {
        if (elf == 'A') { totalScore += play(elf, 'Z'); return; }
        if (elf == 'B') { totalScore += play(elf, 'X'); return; }
        if (elf == 'C') { totalScore += play(elf, 'Y'); return; }
    }

    //draw
    if (me == 'Y') {
        if (elf == 'A') { totalScore += play(elf, 'X'); return; }
        if (elf == 'B') { totalScore += play(elf, 'Y'); return; }
        if (elf == 'C') { totalScore += play(elf, 'Z'); return; }
    }
    
        //win
    if (me == 'Z') {
        if (elf == 'A') {totalScore += play(elf, 'Y'); return; }
        if (elf == 'B') {totalScore += play(elf, 'Z'); return; }
        if (elf == 'C') {totalScore += play(elf, 'X'); return; }
    } 
    
});


console.log(totalScore)

function play(p1, p2) {  
    //P1 A = Rock, B = Paper, C = Scissors
    //P2 X = Rock, Y = Paper, Z = Scissors

    console.log(`Elf plays ${p1}, I play ${p2}`);

    var shapeScore = 0;
    switch (p2) {
        case 'X' : shapeScore = 1; break;
        case 'Y' : shapeScore = 2; break;
        case 'Z' : shapeScore = 3; break;
        default : 0
    }
 
    if ((p1 == 'A' && p2 == 'X') || (p1 == 'B' && p2 == 'Y') || (p1 == 'C' && p2 == 'Z')) return 3 + shapeScore; //draw
    
    //p1 Rock
    if (p1 == 'A' && p2 == 'Y') return 6 + shapeScore;  
    if (p1 == 'A' && p2 == 'Z') return 0 + shapeScore;

    //p1 Paper
    if (p1 == 'B' && p2 == 'X') return 0 + shapeScore;  
    if (p1 == 'B' && p2 == 'Z') return 6 + shapeScore;

    //p1 Scissors
    if (p1 == 'C' && p2 == 'X') return 6 + shapeScore;  
    if (p1 == 'C' && p2 == 'Y') return 0 + shapeScore;  
}
