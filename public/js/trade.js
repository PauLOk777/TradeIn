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

    console.log(from);

    let firstCurr = {};
    let secondCurr = {};

    for (let curr of info) {
        if (curr.name == from) {
            firstCurr = curr;
        }

        if (curr.name == to) {
            console.log(curr);
            secondCurr = curr;
        }
    }

    let koef = firstCurr.cost / secondCurr.cost;

    document
        .getElementById('secondIn')
        .setAttribute('placeholder', amount * koef);

    document.getElementById('secretInputFirst').value = from;
    document.getElementById('secretInputSecond').value = to;
}
