'use strict';


window.Real = require('./lib/real')

function noop () {}
function _getRoot() {
	var root = this._$root
	if (!root) {
		root = this._$root = this.$root()
	}
	return root
}
Real.prototype.$listen = function () {
	var root = _getRoot.call(this)
	var emitter = root ? root.$message() : null
	if (emitter) {
		return emitter.on.apply(emitter, arguments)
	}
	return noop
}
Real.prototype.$unlisten = function () {
	var root = _getRoot.call(this)
	var emitter = root ? root.$message() : null
	emitter && emitter.off.apply(emitter, arguments)
	return this
}
Real.prototype.$notify = function () {
	var root = _getRoot.call(this)
	var emitter = root ? root.$message() : null
	emitter && emitter.emit.apply(emitter, arguments)
	return this
}
module.exports = require('./lib/player')