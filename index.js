const str = process.stdin.pipe(require('split')());

let rain = [];

str.on('data', line => rain.push({
	text: line,
	y: 0,
	x: Math.floor(Math.random() * process.stdout.columns),
	age: 0
}));

setInterval(() => {
	const array = Array(process.stdout.rows - 1).fill(1).map(
		x => Array(process.stdout.columns).fill(' '));
	for (const drop of rain) {
		for (let col = 46, n = 2, i = 0; i < drop.text.length; ++i) {
			const row = array[drop.y - i];
			if (row && row[drop.x])
				row[drop.x] = `\x1b[38;5;${col}m${drop.text[i]}`;
			if (++n >= 3) {
				n = 0;
				if ((col -= 6) < 22)
					break;
			}
		}
		++drop.y;
		++drop.age;
	}
	rain = rain.filter(drop => drop.y < array.length + 20);
	console.log(`\x1b[0;0H\x1b[40m`
		+ array.map(row => row.join('')).join('')
		+ `\x1b[0m\x1b[0;0H`);
}, 100);

str.on('end', () => {
	console.log('\x1b[2J');
	process.exit(0);
});
