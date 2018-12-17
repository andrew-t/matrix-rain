
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
