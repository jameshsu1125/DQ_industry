import React from "react";
import './main.less';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Header from './header';
import Footer from './footer';
import Content from './content';
import ORI from 'UI/OrientationChange'

export default class main extends React.Component {
	render() {
		return ( 
			<div id='main'>
				<Content />
				<Header />
				<Footer />
				<ORI />
			</div>
		);
	}
}

