import React from "react";
import './carousel.less';
import Slider from "react-slick";
import $ from "jquery";


export default class carousel extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.state = { dw: window.innerWidth };
		//scripts
		this.tr = {
			init:function(){
				this.circle.init();
				this.evt();
			},
			evt:function()
			{
				this.resize();
				$(window).resize(()=>this.resize());
			},
			resize:function()
			{
				var h = window.innerHeight - $('#header').height() - $('#footer').height();
				$(root.refs.slider_containers).find('div').height(h)
			},
			circle:{ r:0, time:3000,
				init:function(){
					this.c = $(root.refs.circle);
					this.play();
				},
				play:function(){
					$(this).animate({
						r:this.r + 360
					},{
						duration: this.time,
						step:()=>this.tran(),
						complete:()=>{this.tran(); this.play();},
						easing:'easeInOutQuad'
					});
				},
				tran:function(){
					this.c.css({
						'transform': `rotate(${this.r}deg)`,
						'-webkit-transform': `rotate(${this.r}deg)`,
						'-moz-transform': `rotate(${this.r}deg)`,
						'-o-transform': `rotate(${this.r}deg)`,
						'-ms-transform': `rotate(${this.r}deg)`
					});
				}
			}
		}
	}

	componentDidMount() {
		this.tr.init();
		$(window).resize(()=>{
			this.setState({ dw: window.innerWidth });
		});
	}

	append_slider()
	{
		if(this.state.dw > 640)
		{
			var op = [];
			for(var i = 0; i < 3; i++)
			{	
				op.push(<div class={'slick-pic p_' + i } key={i}></div>)
			}
			return op;
		}
		else
		{
			var op = [];
			for(var i = 0; i < 3; i++)
			{
				op.push(<div class={'slick-pic mp_' + i } key={i}></div>)
			}
			return op;
		}
	}

	render() {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			rows:1,
			swipeToSlide: false,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover:false
		};
		return ( 
			<div ref='main' id='carousel'>
				<div class='row'>
					<div class='col'>
						<div ref='slider_containers' class='slider_containers'>
							<Slider autoplay={ true } ref='slider' {...settings}>
								{ this.append_slider() }
							</Slider>
						</div>
						<div class='pattern'>
							<div ref='circle' class='circle'></div>
							<div class='headline'></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

