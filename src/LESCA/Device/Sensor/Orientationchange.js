module.exports = 
{
	init: function( { callback } ) {
		this.cb = callback || this.on;
		if (window.DeviceOrientationEvent) {
			this.f = this.call.bind(this);
			this.f();
			window.addEventListener('orientationchange', this.f);
		} else this.error();
	},

	call: function(e) {
		var angle;
		if(window.orientation != undefined) angle = window.orientation;
		else angle = screen.orientation.angle;
		this.cb(angle);
	},

	error: function() {
		alert('orientationchnage not support!');
	},

	on: function(ang) {
		console.log(ang);
	},
}