'use strict';

const path = require('path');

module.exports = function (S) {
	class ServerlessSlackPlugin extends S.classes.Plugin {

		static getName () {
			return 'com.blackevil245.' + ServerlessSlackPlugin.name;
		}

		constructor () {
			super();
		}

		registerHooks () {
			S.addHook(this.preFunctionDeploy.bind(this), {
				action: 'functionDeploy',
				event: 'pre',
			});
			S.addHook(this.preFunctionRun.bind(this), {
				action: 'functionRun',
				event: 'pre',
			});
			return Promise.resolve();
		}

		preFunctionDeploy (evt) {
      console.log(evt);
      const functionNames = evt.options.names;
      return Promise.resolve(evt);
		}

		preFunctionRun (evt) {
      const project = S.getProject();
      const functionPaths = project.custom.headerfunctions;

      if (functionPaths && !(functionPaths instanceof Array)) {
        throw new Error('Function paths must be an array and path must be relative to project root');
      }

      if (functionPaths) {
        functionPaths.filter((item, pos) => functionPaths.indexOf(item) === pos).forEach(p => {
          require(path.resolve(p))();
        })
      }

      return Promise.resolve(evt);
		}
	}

	return ServerlessSlackPlugin;
};
