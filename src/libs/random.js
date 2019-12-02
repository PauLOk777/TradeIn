function generateKey(size) {
	let min = 0;
	let max = 36;
	let arr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let res = '';

	for (let i = 0; i < size; i++) {
		let index = Math.floor(min + Math.random() * (max - min));
		res += arr[index];
	}

	return res;
}

module.exports = generateKey;