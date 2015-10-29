'use strict';


window.Real = require('./lib/real')
var rproto = Real.prototype

function noop () {}
/**
 * Get root component of the component instance.
 */
function _getRoot() {
	var root = this._$root
	if (!root) {
		root = this._$root = this.$root()
	}
	return root
}
/**
 * Subcribe message of the player instance
 * @return {Function} Unlisten method
 */
rproto.$listen = function (/*[type, ]handler*/) {
	var root = _getRoot.call(this)
	var emitter = root ? root.$message() : null
	if (emitter) {
		return emitter.on.apply(emitter, arguments)
	}
	return noop
}
/**
 * Remove subscribed message of the player instance
 */
rproto.$unlisten = function (/*[[type, ]handler]*/) {
	var root = _getRoot.call(this)
	var emitter = root ? root.$message() : null
	emitter && emitter.off.apply(emitter, arguments)
	return this
}
/**
 * Publish message to the player instance
 */
rproto.$notify = function (/*type[, data, ...]*/) {
	var root = _getRoot.call(this)
	var emitter = root ? root.$message() : null
	emitter && emitter.emit.apply(emitter, arguments)
	return this
}
module.exports = require('./lib/player')
