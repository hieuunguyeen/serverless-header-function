# Serverless header function

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Not compatible with Serverless 1.0.0 and above

#### Supports:
  > Running a function before the lambda by default on every `sls function run`

  > Wrap a function inside lambda before deployment and run the function by default on lambda run

  > Multiple functions

#### Usage:
  > List all js path file relative to project root

  > Exports the file as a single function `module.exports = function (a, b) { console.log(a,b) }`

  > Profit

#### Under the hood:
  > The plugin will append the `require('path-to-your-header-function')()` state in the beginning of all lambda handler.js file and and immediately self-trigger.

  > If first line is 'use strict', append below it
