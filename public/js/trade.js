'use strict';

let info = JSON.parse(document.getElementById('cost').innerHTML);

function changeCurr(numOfCheck, currName) {
	if(numOfCheck == 1) {
		document.getElementById('checkOne').innerHTML = currName;
	} else {
		document.getElementById('checkTwo').innerHTML = currName;
	}
}

function calculateCost() {
	let from = document.getElementById('checkOne').innerHTML;
	let to = document.getElementById('checkTwo').innerHTML;

}

function block(numOfInput) {
	if(numOfInput == 1) {
		document.getElementById('firstIn').disabled = true;
	} else {
		document.getElementById('secondIn').disabled = true;
	}

	if(document.getElementById('firstIn').value == ''
		&& document.getElementById('secondIn').value == '') {
		console.log('HI');
		document.getElementById('firstIn').disabled = false;
		document.getElementById('secondIn').disabled = false;
	}	
}