'use strict';

module.exports = Real.create({
	template: require('./control.tpl'),
	data: function () {
		return {
			play: false
		}
	},
	methods: {
		_onPlay: function() {
			if (this.$data.play) {
				this.$data.play = false
				this.$update()
				this.$notify('pause')
			} else {
				this.$data.play = true
				this.$update()
				this.$notify('play')
			}
		}
	}
})