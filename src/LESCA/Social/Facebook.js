module.exports = {
	init: function ({ uid, v = 'v3.2', callback = function () {} }, redirect) {
		const self = this;
		this.id = uid;
		this.is = false;

		window.fbAsyncInit = function () {
			FB.init({
				appId: uid,
				cookie: true,
				xfbml: true,
				version: v,
			});
			self.is = true;
			FB.AppEvents.logPageView();
			callback();
			self.status();
		};
		(function (d, s, id) {
			var js;
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js';
			document.body.prepend(js);
		})(document, 'script', 'facebook-jssdk');
	},
	status: function () {
		const $ = require('jquery');
		const Hash = require('UNIT/Get');

		FB.getLoginStatus((e) => {
			this.status = e.status;

			switch (e.status) {
				case 'not_authorized':
					//console.log('未認證');
					break;

				case 'connected':
					//console.log('已認證/已登入');
					this.id = e.authResponse.userID;
					this.pic =
						'http://graph.facebook.com/' + this.id + '/picture?type=large';
					this.token = e.authResponse.accessToken;
					var u = `https://graph.facebook.com/me?access_token=${e.authResponse.accessToken}`;
					$.get(u, (e) => {
						this.name = e.name;
						if (Hash.get('code'))
							this.ready({
								userID: this.id,
								name: this.name,
								accessToken: this.token,
								imageUrl: this.pic,
							});
					});
					break;

				case 'unknown':
					//console.log('登入');
					break;
			}
		});
	},
	ready: function (id, name, token, imageURL) {
		console.log(id, name);
	},
	logout: function () {
		FB.logout((e) => {
			console.log(e);
		});
	},
	click: function () {
		if (!this.is) {
			console.log('init first');
			return;
		}

		if (this.status != 'connected') this.login(window.location.href);
		else
			this.ready({
				userID: this.id,
				name: this.name,
				accessToken: this.token,
				imageUrl: this.pic,
			});
	},
	login: function (redirect) {
		if (!this.is) {
			console.log('init first');
			return;
		}
		window.location.href =
			'https://www.facebook.com/dialog/oauth?client_id=' +
			this.id +
			'&redirect_uri=' +
			encodeURIComponent(redirect);
	},
};
