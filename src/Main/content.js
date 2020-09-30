import React from "react";
import "./content.less";

import Carousel from "./carousel";
import Recycle from "./recycle";
import Step from "./step";
import Back2Life from "./back2life";
import Maps from "./maps";

export default class body extends React.Component {
	render() {
		return (
			<div id="content">
				<Carousel />
				<Recycle />
				<Step />
				<Back2Life />
				<Maps />
			</div>
		);
	}
}
