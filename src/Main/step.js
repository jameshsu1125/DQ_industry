import React from 'react';
import './step.less';

import Data from './step-data';
import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';
import Popup from './popup';

export default class step extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { popup: false };
		this.data = Data;
		this.index = 0;
	}

	componentDidMount() {
		$(this.refs.ico)
			.children('div')
			.click((e) => {
				var index = parseInt(e.target.id.slice(1));
				this.index = index;
				this.setState({ popup: true });
			});
		$(this.refs.btn).click((e) => {
			window.open('https://youtu.be/1r_Tv2x_Czg');
		});
	}

	appendIcon() {
		var op = [];
		for (var i = 0; i < 10; i++) {
			op.push(
				<div id={'p' + i} key={i} class={'i ' + 'p' + i}>
					<div class='txt'>{ReactHtmlParser(Data[i].db[0].name)}</div>
				</div>
			);
		}
		return op;
	}

	appendSetps() {
		var op = [];
		for (var i = 0; i < 6; i++) {
			op.push(
				<div key={i} class={'s ' + 'bg' + i}>
					<div class={'d m' + i}></div>
				</div>
			);
		}
		return op;
	}

	popupend() {
		this.setState({ popup: false });
	}

	appendPopup() {
		if (this.state.popup)
			return (
				<Popup
					index={this.index}
					data={this.data}
					end={this.popupend.bind(this)}
				/>
			);
	}

	render() {
		return (
			<div id='step'>
				<div class='bg'></div>
				<div class='rows'>
					<h2>回收循環第一步</h2>
					<h5 class='mt-4'>回收項目</h5>
				</div>
				<div ref='ico' class='rows'>
					{this.appendIcon()}
				</div>
				<div class='rows mt-5 pt-5'>
					<h2>細節分類，利用更精細</h2>
				</div>
				<div class='rows'>{this.appendSetps()}</div>
				<div class='rows mt-4'>
					<div ref='btn' class='btn'>
						點擊觀看影片
					</div>
				</div>
				{this.appendPopup()}
			</div>
		);
	}
}
