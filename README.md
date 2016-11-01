# Serverless header function

Run a js file locally for every registered Serverless actions

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

### Current supports:
1. Running a function by a hook
3. Serially execute multiple functions. TODO: Support Async

### Usage:
1. List all js path file relative to project root in `s-project.json` under `custom.headerfunctions`, the disired hook and params.
```
custom: {
    headerfunctions: [
      {
        path: 'lib/func-a.js',
        hook: 'function-pre-run',
        params: []
      },
      {
        path: 'src/a/b/c/function-bcde.js',
        hook: 'function-post-deploy',
        params: ['a', 1, null, true]
      }
    ]
}
```
2. Hooks are in the format of `target-hook-action`. `target` and `hook` input are mandatory. Currently supported input are:
```
target: enum['function','endpoint'] // Endpoint not yet support run hook
event: enum['pre', 'post']
action: enum['run', 'deploy']
params: array
```
3. Params will be digested in `require(path).apply(params)` manner. Therefore in the header function file, retrieve params by calling lexical `arguments`
4. The last of the params will be the **context** object which contains information about the serverless action
5. Exports the file as a single function without input parameter
`module.exports = function () { console.log(a,b) }`
6. Profit!
