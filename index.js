'use strict';

const path = require('path');

module.exports = function (S) {
	class ServerlessPlugin extends S.classes.Plugin {

		static getName () {
			return 'com.blackevil245.' + ServerlessPlugin.name;
		}

		constructor () {
			super();
		}

		registerHooks () {
			S.addHook(this.preFunctionDeploy.bind(this), {
				action: 'functionDeploy',
				event: 'pre',
			});
			S.addHook(this.postFunctionDeploy.bind(this), {
				action: 'functionDeploy',
				event: 'post',
			});
			S.addHook(this.preFunctionRun.bind(this), {
				action: 'functionRun',
				event: 'pre',
			});
			S.addHook(this.postFunctionRun.bind(this), {
				action: 'functionRun',
				event: 'post',
			});
			S.addHook(this.preEndpointDeploy.bind(this), {
				action: 'endpointDeploy',
				event: 'pre',
			});
			S.addHook(this.postEndpointDeploy.bind(this), {
				action: 'endpointDeploy',
				event: 'post',
			});

			S.addHook(this.preEventDeploy.bind(this), {
				action: 'eventDeploy',
				event: 'pre',
			});
			S.addHook(this.postEventDeploy.bind(this), {
				action: 'eventDeploy',
				event: 'post',
			});
			return Promise.resolve();
		}

    digestQueue(queue, evt) {
      queue.forEach(item => {
        item.params.push(S);
        item.params.push(evt);
        require(path.join(S.getProject().getRootPath(), item.path)).apply(null, item.params);
      })
      return Promise.resolve(evt)
    }

    preFunctionDeploy(evt) {
      const queue = this.parseConfig('function', 'pre', 'deploy');
      return this.digestQueue(queue, evt);
    }

    postFunctionDeploy(evt) {
      const queue = this.parseConfig('function', 'post', 'deploy');
      return this.digestQueue(queue, evt);
    }

		preFunctionRun (evt) {
      const queue = this.parseConfig('function', 'pre', 'run');
      return this.digestQueue(queue, evt);
		}

		postFunctionRun (evt) {
      const queue = this.parseConfig('function', 'post', 'run');
      return this.digestQueue(queue, evt);
		}

    preEndpointDeploy(evt) {
      const queue = this.parseConfig('endpoint', 'pre', 'deploy');
      return this.digestQueue(queue, evt);
    }

    postEndpointDeploy(evt) {
      const queue = this.parseConfig('endpoint', 'post', 'deploy');
      return this.digestQueue(queue, evt);
    }

    preEventDeploy(evt) {
      const queue = this.parseConfig('event', 'pre', 'deploy');
      return this.digestQueue(queue, evt);
    }

    postEventDeploy(evt) {
      const queue = this.parseConfig('event', 'post', 'deploy');
      return this.digestQueue(queue, evt);
    }

    parseConfig(target, event, action) {
      const config = S.getProject().custom.headerfunctions;
      return config.filter(item => {
        const hook = item.hook.split('-');
        return target === hook[0] && event === hook[1] && action === hook[2];
      })
    }
	}

	return ServerlessPlugin;
};
