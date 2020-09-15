import React from "react";
import Sensor from './../Device/Sensor/orientationchange.js';
import './orientationChange.less';

export default class orientationChange extends React.Component {

	constructor(props) {
		super(props);
		this.state = { show:false };

		this.ico = `url(${ this.props.ico ? this.ico : require('./img/oc2.png') })`;
	}

	componentDidMount() 
	{
		const root = this;

		Sensor.init({
			callback: function(e) {
				var s = window.screen.width / 640;
				var viewportmeta = document.querySelector('meta[name="viewport"]');
				viewportmeta.content = 'width=640, minimum-scale=' + s + ', maximum-scale=' + s + ', initial-scale=' + s;
				root.setState({
					show: e != 0
				});
			}
		});
	}

	set()
	{
		if(this.state.show) return <div id='lesca-oc' style={ { backgroundImage: this.ico, backgroundSize: '5.2em' } } ></div>;
	}



	render() {
		return ( 
			<div>
				{ this.set() }
			</div>
		);
	}
}

