import React from "react";
import './main.less';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Header from './header';
import Footer from './footer';
import Content from './content';

export default class main extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
	}

	componentDidMount() {

	}


	render() {
		return ( 
			<div id='main'>
				<Content />
				<Header />
				<Footer />
			</div>
		);
	}
}

