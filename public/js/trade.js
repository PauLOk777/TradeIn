'use strict';

let info = JSON.parse(document.getElementById('cost').innerHTML);

function changeCurr(numOfCheck, currName) {
    if (numOfCheck == 1) {
        document.getElementById('checkOne').innerHTML = currName;
    } else {
        document.getElementById('checkTwo').innerHTML = currName;
    }
}

function calculateCost() {
    let from = document.getElementById('checkOne').innerHTML;
    let to = document.getElementById('checkTwo').innerHTML;
    let amount = document.getElementById('firstIn').value;

    let firstCurr = {};
    let secondCurr = {};

    for (let curr of info) {
        if (curr.name == from) {
            firstCurr = curr;
            continue;
        }

        if (curr.name == to) {
            secondCurr = curr;
        }
    }

    let koef = secondCurr.cost / firstCurr.cost;

    document
        .getElementById('secondIn')
        .setAttribute('placeholder', amount * koef);
}
