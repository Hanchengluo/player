'use strict';

window.Real = require('./lib/real')

var undef = void()

Real.directive('text', {
	update: function (value) {
		if (value === undef) {
			value = ''
		}
		this.$el.innerText = value
	}
})
Real.directive('content', {
	bind: function () {

	},
	shouldUpdate: function (value) {

	},
	update: function (value) {
		if (value === undef) {
			value = ''
		}
		this.$el.innerText = value
	}
})

module.exports = require('./lib/player')