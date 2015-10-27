'use strict';

module.exports = Real.create({
	data: function () {
		return {
			show: true,
			poster: ''
		}
	},
	template: require('./poster.tpl'),
	ready: function () {
		this.$listen('play', this.hide)
	},
	methods: {
		hide: function () {
			this.$data.show = false
			this.$update()
		}
	}
})