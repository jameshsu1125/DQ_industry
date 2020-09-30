import React from 'react';
import './header.less';

import $ from 'jquery';
require('jquery-easing');

export default class header extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.tr = {
			init: function () {
				this.ham.init();
				this.menu.init();
			},
			menu: {
				is: true,
				init: function () {
					this.c = $(root.refs.menu);
					this.evt();
				},
				evt: function () {
					$(window).resize(() => {
						var w = window.innerWidth;
						if (w > 640) {
							$(this.c).removeAttr('style');
							root.tr.ham.reset();
						}
					});
				},
				open: function () {
					var w = window.innerWidth;
					if (w > 640) return;
					this.c.animate({ height: '330px' }, 400, 'easeInOutQuart');
				},
				close: function () {
					var w = window.innerWidth;
					if (w > 640) return;
					this.c.animate({ height: '0px' }, 400, 'easeInOutQuart');
				},
			},
			ham: {
				is: true,
				can: true,
				init: function () {
					this.c = $(root.refs.ham);
					this.evt();
				},
				evt: function () {
					this.c.click(() => this.clicked());
				},
				reset: function () {
					this.is = true;
					this.c.find('.l').removeAttr('style');
				},
				clicked: function () {
					if (!this.can) return;
					this.can = false;

					if (this.is) this.open();
					else this.close();

					this.is = !this.is;
				},
				close: function () {
					const self = this;

					root.tr.menu.close();

					this.c.find('.l').each(function (i) {
						switch (i) {
							case 0:
								self.rotate(this, 0);
								break;

							case 1:
								setTimeout(() => {
									$(this).show();
								}, 200);
								break;

							case 2:
								self.rotate(this, 0);
								break;
						}

						$(this)
							.delay(200)
							.animate(
								{
									left: -4 + (i - 1) * 18 + 'px',
								},
								200,
								'easeOutQuart',
								() => {
									self.can = true;
								}
							);
					});
				},
				open: function () {
					const self = this;

					root.tr.menu.open();

					this.c.find('.l').each(function (i) {
						$(this).animate(
							{
								left: '-4px',
							},
							200,
							'easeOutQuart',
							() => {
								switch (i) {
									case 0:
										self.rotate(this, -45 - 90);
										break;

									case 1:
										$(this).hide();
										break;

									case 2:
										self.rotate(this, 45 + 90);
										break;
								}
							}
						);
					});
				},
				rotate: function (tar, r) {
					const self = this;
					var tar = $(tar);
					var nr = this.getRotation(tar);
					var p = { r: nr };

					$(p).animate(
						{
							r: r,
						},
						{
							duration: 200,
							step: function () {
								tar.css({
									transform: `rotate(${this.r}deg)`,
									'-webkit-transform': `rotate(${this.r}deg)`,
									'-moz-transform': `rotate(${this.r}deg)`,
									'-o-transform': `rotate(${this.r}deg)`,
									'-ms-transform': `rotate(${this.r}deg)`,
								});
							},
							complete: function () {
								tar.css({
									transform: `rotate(${this.r}deg)`,
									'-webkit-transform': `rotate(${this.r}deg)`,
									'-moz-transform': `rotate(${this.r}deg)`,
									'-o-transform': `rotate(${this.r}deg)`,
									'-ms-transform': `rotate(${this.r}deg)`,
								});
								if (r != 0) self.can = true;
							},
						}
					);
				},
				getRotation: function (tar) {
					var matrix =
						tar.css('-webkit-transform') ||
						tar.css('-moz-transform') ||
						tar.css('-ms-transform') ||
						tar.css('-o-transform') ||
						tar.css('transform');
					if (matrix !== 'none') {
						var values = matrix.split('(')[1].split(')')[0].split(',');
						var a = values[0];
						var b = values[1];
						var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
					} else {
						var angle = 0;
					}
					return angle;
				},
			},
		};
	}

	componentDidMount() {
		const self = this;

		this.tr.init();

		var hash = ['about', 'steps', 'items', 'contact'];

		var tar = ['recycle', 'step', 'back2life', 'maps'];

		$(this.refs.menu)
			.children('.b')
			.click(function () {
				var index = parseInt(this.id.slice(2));
				window.location.hash = '#' + hash[index];
			});

		$(window).on('hashchange', () => {
			var h = window.location.hash.slice(1);
			var index = false;
			for (var i = 0; i < hash.length; i++) {
				if (h == hash[i]) index = i;
			}
			var t = tar[index];

			var pxy = $('#' + t).offset().top - $(this.refs.main).height();

			self.scrollTo(pxy);
			self.tr.ham.clicked();
		});
	}

	scrollTo(e) {
		var now = $('document, html').scrollTop();
		var t = Math.abs(now - e);
		$('document, html').animate(
			{ scrollTop: e },
			t > 1000 ? 1000 : t,
			'easeOutQuart'
		);
	}

	render() {
		return (
			<div ref='main' id='header'>
				<div class='rows'>
					<div id='header-logo'></div>
					<div ref='menu' class='header-menu'>
						<div id='hb0' class='b'>
							公司簡介
						</div>
						<div id='hb1' class='b'>
							作業流程
						</div>
						<div id='hb2' class='b'>
							可製品項
						</div>
						<div id='hb3' class='b'>
							聯絡我們
						</div>
					</div>
					<div ref='ham' class='header-ham'>
						<div class='c'>
							<div class='l'></div>
							<div class='l'></div>
							<div class='l'></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
