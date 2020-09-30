import React from 'react';
import './maps.less';

import $ from 'jquery';

export default class maps extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.data = [
			'22.571167, 120.603667',
			'22.647250, 120.390194',
			'22.703361, 120.344806',
			'23.189167, 120.277750',
			'23.298583, 120.276333',
			'',
		];
		this.state = { index: 0 };
	}

	componentDidMount() {
		$('.bmap').click((e) => {
			var index = parseInt(e.target.id.slice(1));
			if (index < 5) {
				this.setState({ index: index });
				this.setBtnStyle();
			}
		});
	}

	setBtnStyle() {
		const self = this;
		$('.bmap').each(function (i) {
			if (i == self.state.index) $(this).addClass('on');
			else $(this).removeClass('on');
		});
	}

	appendMaps() {
		return (
			<iframe
				height='450'
				frameBorder='0'
				src={
					'https://www.google.com/maps/embed/v1/place?q=' +
					this.data[this.state.index] +
					'&key=AIzaSyBAkUIZBcGHr1DLLAbZbb7mT-7LzwWEhPk'
				}></iframe>
		);
	}

	render() {
		return (
			<div id='maps'>
				<div class='rows'>
					<div class='cols'>
						<div class='logos'>
							<div class='logo'></div>
							<div class='title'>
								<h2>協治企業</h2>
								<h5>廢料不廢，資源回歸</h5>
							</div>
						</div>
						<div class='btns mt-5'>
							<div class='brow'>
								<div id='m0' class='bmap on'>
									屏東萬巒廠
								</div>
								<div class='t'>
									屏東縣萬巒鄉新厝村新平路49-11號
									<br />
									08-7830874
								</div>
							</div>
							<div class='brow'>
								<div id='m1' class='bmap'>
									高雄鳥松廠
								</div>
								<div class='t'>
									高雄市鳥松區美山路103號
									<br />
									07-7318001
								</div>
							</div>
							<div class='brow'>
								<div id='m2' class='bmap'>
									高雄管理部
								</div>
								<div class='t'>
									高雄市仁武區仁樂街22號
									<br />
									07-3759798
								</div>
							</div>
							<div class='brow'>
								<div id='m3' class='bmap'>
									台南麻豆廠
								</div>
								<div class='t'>
									台南市麻豆區寮部里寮子部166-7號
									<br />
									06-5728855
								</div>
							</div>
							<div class='brow'>
								<div id='m4' class='bmap'>
									台南新營廠
								</div>
								<div class='t'>
									台南市新營區太子宮25-36號
									<br />
									06-6529921
								</div>
							</div>
							<div class='brow'>
								<div id='m5' class='bmap'>
									台南仁德廠
								</div>
								<div class='t2'>coming soon…</div>
							</div>
						</div>
					</div>
					<div class='cols'>
						<div ref='map' id='map' class='gmap'>
							{this.appendMaps()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
