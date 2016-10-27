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
			S.addHook(this.preFunctionRun.bind(this), {
				action: 'functionRun',
				event: 'pre',
			});
			return Promise.resolve();
		}

		preFunctionRun (evt) {
      const headerFunctionPaths = S.getProject().custom.headerfunctions;

      if (headerFunctionPaths && !(headerFunctionPaths instanceof Array)) {
        throw new Error('Function paths must be an array and path must be relative to project root');
      }

      if (headerFunctionPaths) {
        headerFunctionPaths.filter((item, pos) => headerFunctionPaths.indexOf(item) === pos).forEach(p => {
          require(path.resolve(p))();
        })
      }

      return Promise.resolve(evt);
		}
	}

	return ServerlessSlackPlugin;
};
