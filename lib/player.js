'use strict';

var Message = require('message')
var util = require('util')
var Video = require('comps/video')
var Control = require('comps/control')
var proto = Player.prototype

function Player (opts) {

	var $p = this
	var $con = opts.container || document.createElement('div')
	var message = this.$message = new Message()
	this.$refs = {}
	/**
	 * External listening
	 */
	Object.keys(opts).forEach(function (k) {
		if (/^on/.test(k) && util.type(opts[k])) {
			$p.on(k.replace(/^on/, ''), opts[k])
		}
	})

	/**
	 * Player video
	 */
	var $view = this.$view = new Real({
		el: $con,
		methods: {
			'$message': function () {
				return message
			}
		}
	})

	/**
	 * Video component
	 */
	var $video = this.$refs.video = new Video({
		parent: $view,
		replace: true,
		data: {
			autoplay: false
		}
	})
	$video.$appendTo($view)

	/**
	 * Video component
	 */
	var $control = this.$refs.control = new Control({
		parent: $view,
		replace: true,
		data: {
			autoplay: false
		}
	})
	$control.$appendTo($view)

}
/**
 * Expose methods
 */
proto.on = function () {
	return this.$message.on.apply(this.$message, arguments)
}
proto.off = function () {
	this.$message.on.apply(this.$message, arguments)
	return this
}
proto.stop = function () {
	this._view.stop()
	return this
}
proto.play = function () {
	this._view.play()
	return this
}

module.exports = Player