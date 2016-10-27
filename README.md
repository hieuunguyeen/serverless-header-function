# Serverless header function

Run a js file locally before lambda runs

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

> Not compatible with Serverless 1.0.0 and above

### Installation
Make sure you have Node.js v4.0+ and Serverless Framework installed
Install plugin in the root level of your Serverless project

`npm install --save-dev serverless-header-function`

Append the plugin's name to serverless plugins list in `s-project.json`
```
plugins: [
  "serverless-header-function"
]
```

### Supports:
1. Running a function before the lambda by default on every `sls function run`.
2. Multiple functions.

### Usage:
1. List all js path file relative to project root in `s-project.json` under `custom.headerfunctions`
```
custom: {
    headerfunctions: [
      'lib/func-a.js',
      'src/a/b/c/function-bcde.js'
    ]
}
```
2. Exports the file as a single function `module.exports = function (a, b) { console.log(a,b) }`
3. Profit!
