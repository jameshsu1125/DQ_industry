module.exports = {
	init: function ({ callback }) {
		this.cb = callback || this.on;
		this.delay = false;
		this.r = 0;
		this.is = true;
		if (window.DeviceOrientationEvent) {
			this.f = this.call.bind(this);
			window.addEventListener('deviceorientation', this.f);
		} else this.error();
	},

	call: function (e) {
		if (!this.is) return;
		var d, t, h;
		if (typeof e.webkitCompassHeading !== 'undefined') {
			d = e.webkitCompassHeading;
			if (typeof window.orientation !== 'undefined') d += window.orientation;
		} else {
			d = 360 - e.alpha;
		}
		t = Math.round(d) - this.r;
		h = Math.round(d);
		var g, b, a;
		g = Math.round(e.gamma);
		b = Math.round(e.beta);
		a = h;
		if (this.delay) this.cb(g, b, a);
		setTimeout(
			function () {
				this.delay = true;
			}.bind(this),
			200
		);
	},

	error: function () {
		alert('orientation not support!');
	},

	on: function (LR, FB, Dir) {
		console.log(LR, FB, Dir);
	},

	remove: function () {
		window.removeEventListener('deviceorientation', this.f);
	},
};
