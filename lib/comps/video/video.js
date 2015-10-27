'use strict';

module.exports = Real.create({
	template: require('./video.tpl'),
	data: function () {
		return {
			autoplay: false
		}
	},
	ready: function () {
		this.$el.addEventListener('loadeddata',function () {
			this.$notify('load')
		}.bind(this))

		this.$listen('play', this.play)
	},
	methods: {
		play: function () {
			this.$el.play()
		}
	}
})