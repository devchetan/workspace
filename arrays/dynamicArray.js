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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the dynamicArray function below.
 */

function query1(x, la, n) {
    return (x ^ la) % n;
}

function query2(x, y, la, n, seqs) {
    let seqInd = (x ^ la) % n;
    let elemInd = y % seqs[seqInd].length;
    return seqs[seqInd][elemInd];
}

function dynamicArray(n, queries) {
    /*
     * Write your code here.
     */
    let result = [];
    let seqs = [];
    let la = 0;
    for(var i = 0; i< n; i++) {
        seqs.push([]);
    }
    for(var i = 0; i <= (queries.length - 1); i++){
        let x = queries[i][1];
        let y = queries[i][2];
        if(queries[i][0] == 1){
            seqs[query1(x, la, n)].push(y);
        }else{
            la = query2(x, y, la, n, seqs);
            result.push(la);
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nq = readLine().split(' ');

    const n = parseInt(nq[0], 10);

    const q = parseInt(nq[1], 10);

    let queries = Array(q);

    for (let queriesRowItr = 0; queriesRowItr < q; queriesRowItr++) {
        queries[queriesRowItr] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = dynamicArray(n, queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
