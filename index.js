#!/usr/bin/env node

const str = process.stdin.pipe(require('split')()),
	argv = require('minimist')(process.argv.slice(2));

let rain = [];

str.on('data', line => {
	const drop = {
		text: line.substr(argv.trim || 0)
			.replace(/\s+/g, ' '),
		y: 0,
		x: Math.floor(Math.random() * process.stdout.columns)
	};
	if (drop.text)
		rain.push(drop);
});

setInterval(() => {
	const array = Array(process.stdout.rows).fill(1).map(
		x => Array(process.stdout.columns).fill(' '));
	for (const drop of rain) {
		for (let col = 46, n = 2, i = 0; i < drop.text.length; ++i) {
			const row = array[drop.y - i],
				char = drop.text[drop.y - i];
			if (row && row[drop.x] && char)
				row[drop.x] = `\x1b[${drop.y - i};${drop.x}H\x1b[38;5;${col}m${char}`;
			if (++n >= 3) {
				n = 0;
				if ((col -= 6) < 22)
					break;
			}
		}
		++drop.y;
	}
	rain = rain.filter(drop => drop.y < array.length + 20);
	console.log(`\x1b[0;0H\x1b[40m`
		+ array.map(row => row.join('')).join('')
		+ `\x1b[0m\x1b[0;0H`);
}, 100);

str.on('end', () => {
	console.log(`\x1b[${process.stdout.rows};0H\x1b[2J`);
	process.exit(0);
});
