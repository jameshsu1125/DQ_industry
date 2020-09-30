import React from 'react';
import './history.less';

import $ from 'jquery';
require('jquery-easing');

import ReactHtmlParser from 'react-html-parser';

export default class history extends React.Component {
	componentDidMount() {
		if (this.props.index % 4 == 0 || this.props.index % 4 == 3) {
			var dom = this.refs.line;
			$(dom).css('height', '-=75px');
		}

		$(this.refs.btn).click(() => {
			this.props.open(this.props.index);
		});
	}

	appendRow(db) {
		var op = [];
		for (var i = 0; i < db.length; i++) {
			op.push(<li key={i}>{db[i].name}</li>);
		}
		return op;
	}

	appendName() {
		var op = [];
		if (this.props.data.db.length > 1) {
			op.push(<ul key={1}>{this.appendRow(this.props.data.db)}</ul>);
		} else {
			op.push(this.props.data.db[0].name);
		}

		return op;
	}

	render() {
		return (
			<div id='history'>
				<div
					ref='line'
					class={'line ' + (this.props.index % 2 == 0 ? 't' : 'b')}
					style={{ left: `${19 * Math.floor(this.props.index * 5)}px` }}>
					<div
						ref='btn'
						class={'btn ' + (this.props.index % 2 == 0 ? 'tt' : 'bb')}>
						{this.props.data.date}
					</div>
					<div class={'txt ' + (this.props.index % 2 == 0 ? 'ttt' : 'bbb')}>
						{this.appendName()}
					</div>
				</div>
			</div>
		);
	}
}
