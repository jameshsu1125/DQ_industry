module.exports = {
	init: function ({ v = 20, callback }) {
		this.d = this.s = { x: 0, y: 0, z: 0 };
		this.is = true;
		this.g = v;
		this.cb = callback || this.on;
		if (typeof window.DeviceMotionEvent !== 'undefined') {
			this.f = this.call.bind(this);
			window.addEventListener('devicemotion', this.f);
			this.i = setInterval(() => {
				this.sync();
			}, 100);
		} else this.error();
	},

	call: function (e) {
		this.d = e.accelerationIncludingGravity;
	},

	sync: function () {
		if (!this.is) return;
		this.is = false;
		let c = Math.abs(
			this.d.x - this.s.x + this.d.y - this.s.y + this.d.z + this.s.z
		);
		if (c > this.g) this.cb(c);
		this.s = this.d;
		setTimeout(() => {
			this.is = true;
		}, 300);
	},

	on: function (e) {
		console.log(e);
	},

	remove: function () {
		window.removeEventListener('devicemotion', this.f);
		clearInterval(this.i);
	},

	error: function (e) {
		alert('motion not support!');
	},
};
