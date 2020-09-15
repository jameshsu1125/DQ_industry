import React from "react";

export default class QR extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
	}

	componentDidMount() {
		this.refs.img.src = this._googleQr();
	}

	_googleQr()
	{
		var url = encodeURIComponent(this.props.url);
		return 'http://chart.apis.google.com/chart?cht=qr&chl=' + url + '&chs=' + this.props.width + 'x' + this.props.height;
	}

	render() {
		return ( 
			<img ref='img' src="" width={ this.props.width } height={ this.props.height } />
		);
	}
}

