'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function update(d, l, r, x, n){
    d[l] += x;
    if(r + 1 <= n) {
        d[r + 1] -= x;    
    }
    return d;
}

// Complete the diffArray function below.
function diffArray(n, queries) {
    var dArr = new Array(n+1).fill(0);
    
    for (var i = 0; i < queries.length; i++) {
        dArr = update(dArr, queries[i][0], queries[i][1], queries[i][2], n);
    }
    
    var max = 0;
    var inc = 0;
    
    for(var i = 0; i < dArr.length; i++){
        inc += dArr[i];
        if(max < inc) {
            max = inc;
        }
    }

    //console.log("Difference array: ", dArr);
    
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = diffArray(n, queries);

    ws.write(result + "\n");

    ws.end();
}
