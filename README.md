
# matrix-rain-stream

Visualise long-running terminal processes as Matrix-style code rain

## Usage

To install, use

```sh
npm i -g matrix-rain-stream
```

To run, pipe any process into `rain`:

```sh
adb logcat | rain
```

As an example, you can use the `log-shit.js` file included to log random numbers every few milliseconds. From the main `matrix-rain-stream` folder:

```sh
node log-shit.js | node index.js
```

You can also get `stderr` to rain in blood-red code by passing your desired process as an argument after `--` rather than piping it:

```sh
rain -- adb logcat
rain -- node log-shit.js
```

Command line args so far:

## `-trim N`

Removes N characters from the start of log lines. Useful for processes which prefix log lines with IDs or timestamps.
