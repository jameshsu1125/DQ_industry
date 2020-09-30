import React from "react";
import Sensor from './../Device/Sensor/orientationchange.js';

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
				var s, viewportmeta = document.querySelector('meta[name="viewport"]');
				if(e == 0)
				{
					s = window.screen.width / 640;
					viewportmeta.content = 'width=640, minimum-scale=' + s + ', maximum-scale=' + s + ', initial-scale=' + s;
				}
				else
				{
					s = window.screen.width / 990;
					viewportmeta.content = 'width=990, minimum-scale=' + s + ', maximum-scale=' + s + ', initial-scale=' + s;
				}
			}
		});
	}

	render() {
		return ( 
			<div>
				
			</div>
		);
	}
}

