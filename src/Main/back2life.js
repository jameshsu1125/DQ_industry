import React from "react";
import "./back2life.less";
import Slider from "react-slick";
import $ from "jquery";
import Data from "./back2life-data";
import Pad from "UNIT/NumberPad";

export default class back2life extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { dw: window.innerWidth };
		this.data = Data;
		this.index = 0;
		this.max = Math.ceil(this.data.length / 3);
		this.cel = this.data.length % 3;
	}

	componentDidMount() {
		$(window).resize(() => {
			this.setState({ dw: window.innerWidth });
		});
		$(this.refs.l).click(() => {
			this.refs.slider.slickPrev();
		});
		$(this.refs.r).click(() => {
			this.refs.slider.slickNext();
		});
	}

	append_slider() {
		var op = [];
		for (var i = 0; i < this.data.length; i++) {
			op.push(
				<div class="card" key={i}>
					<div
						class="img"
						style={{
							background: `rgba(0, 0, 0, 0) url('${this.data[i].img}') no-repeat scroll center center / cover`,
						}}
					></div>
					<div class="txt"> {this.data[i].txt} </div>
				</div>,
			);
		}
		return op;
	}

	append_slid() {
		if (this.state.dw > 640) {
			var settings = {
				infinite: true,
				speed: 500,
				dots: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: false,
				rows: 1,
				swipeToSlide: false,
				autoplay: false,
				autoplaySpeed: 3000,
				afterChange: (e) => {
					if (e == "left") this.index++;
					else this.index--;
					this.index = this.index > 1 ? 0 : this.index;
					this.index = this.index < 0 ? 1 : this.index;
					var max, min;
					if (this.index == 0) {
						max = 4;
						min = 6;
					} else if (this.index == 1) {
						max = 1;
						min = 3;
					}
					this.refs.l.innerText = Pad.pad(min, 2);
					this.refs.r.innerText = Pad.pad(max, 2);
				},
			};
		} else {
			var settings = {
				infinite: true,
				speed: 500,
				dots: true,
				slidesToShow: 2,
				slidesToScroll: 2,
				arrows: false,
				rows: 1,
				swipeToSlide: false,
				autoplay: false,
				autoplaySpeed: 3000,
				afterChange: (e) => {
					if (e == "left") this.index++;
					else this.index--;
					this.index = this.index > 3 ? 0 : this.index;
					this.index = this.index < 0 ? 1 : this.index;
					var max, min;
					if (this.index == 0) {
						max = 3;
						min = 6;
					} else if (this.index == 1) {
						max = 5;
						min = 2;
					} else {
						max = 1;
						min = 4;
					}
					this.refs.l.innerText = Pad.pad(min, 2);
					this.refs.r.innerText = Pad.pad(max, 2);
				},
			};
		}
		return (
			<Slider ref="slider" {...settings}>
				{this.append_slider()}
			</Slider>
		);
	}

	render() {
		return (
			<div id="back2life">
				<div class="rows">
					<h2>回歸生活零浪費</h2>
				</div>
				<div class="rows2 mt-3">
					{this.append_slid()}
					<div ref="l" class="arr l">
						06
					</div>
					<div ref="r" class="arr r">
						04
					</div>
				</div>
			</div>
		);
	}
}
