#!/usr/bin/env node

const cols = [ '97', /*'38;5;10',*/
		'38;5;46', '38;5;40', '38;5;34', '38;5;28', '38;5;22' ],
	errCols = [ '97', /*'38;5;9',*/
		'38;5;196', '38;5;160', '38;5;124', '38;5;88', '38;5;52' ];

const split = require('split'),
	{ spawn } = require('child_process'),
	argv = require('minimist')(process.argv.slice(2));

let rain = [];

if (argv._ && argv._.length > 0) {
	const cmd = argv._.shift(),
		p = spawn(cmd, argv._);
	streamRain(p.stdout, cols);
	streamRain(p.stderr, errCols);
	process.on('SIGINT', () => p.kill('SIGINT'));
} else
	streamRain(process.stdin, cols);

function streamRain(str, colours) {
	str = str.pipe(split());

	str.on('data', line => {
		const drop = {
			text: line.substr(argv.trim || 0)
				.replace(/\s+/g, ' '),
			y: 0,
			x: Math.floor(Math.random() * process.stdout.columns),
			colours
		};
		if (drop.text)
			rain.push(drop);
	});

	str.on('end', () => {
		console.log(`\x1b[${process.stdout.rows};0H\x1b[2J`);
		process.exit(0);
	});
}

setInterval(() => {
	const array = Array(process.stdout.rows).fill(1).map(
		x => Array(process.stdout.columns).fill(' '));
	for (const drop of rain) {
		for (let col = 0, n = 2, i = 0; i < drop.text.length; ++i) {
			const row = array[drop.y - i - 1],
				char = drop.text[drop.y - i - 1];
			if (row && row[drop.x] && char)
				row[drop.x] = `\x1b[${drop.y - i};${drop.x}H\x1b[${drop.colours[col]}m${char}`;
			if (++n >= 3) {
				n = 0;
				if (++col >= drop.colours.length)
					break;
			}
		}
		++drop.y;
	}
	rain = rain.filter(drop => drop.y < array.length + 20);
	console.log(`\x1b[0;0H\x1b[48;5;232m`
		+ array.map(row => row.join('')).join('')
		+ `\x1b[0m\x1b[0;0H`);
}, 100);
