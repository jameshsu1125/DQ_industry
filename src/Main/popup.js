import React from "react";
import './popup.less';

import $ from "jquery";
require("jquery-easing");
require('jquery.waitForImages');


export default class popup extends React.Component {

	constructor(props) {
		super(props);
		const root = this;

		this.data = [];
		for(var i = 0; i < this.props.data.length; i++) {
			for(var j = 0; j < this.props.data[i].db.length; j++) {
				var d = this.props.data[i].db[j];
				d.index = i;
				this.data.push(d);
			}
		}

		for(i = 0; i < this.data.length; i++) 
		{
			if(this.props.index == this.data[i].index)
			{
				this.index = i;
				break;
			}
		}
		this.state = { img:`rgba(0, 0, 0, 0) url('${ this.data[this.index].img }') no-repeat scroll center center / cover`, name:this.data[this.index].name, des:this.data[this.index].des  }
	}

	in()
	{
		$(this.refs.main).animate({
			opacity: 1
		},500, 'easeOutQuart')
	}

	componentDidMount() {

		$(this.refs.main).waitForImages({
			finished: ()=>this.in(),
			waitForAll: true
		});

		$(this.refs.b).click(()=>{ this.props.end(); });
		$(this.refs.btn).click(()=>{ this.props.end(); });
		$(this.refs.arr).click(()=>{
			this.index ++;
			if(this.index >= this.data.length) this.index = 0;
			this.setState({ img:`rgba(0, 0, 0, 0) url('${ this.data[this.index].img }') no-repeat scroll center center / cover`, name:this.data[this.index].name, des:this.data[this.index].des  });
		});

		$(this.refs.arl).click(()=>{
			this.index --;
			if(this.index < 0) this.index = this.data.length - 1;
			this.setState({ img:`rgba(0, 0, 0, 0) url('${ this.data[this.index].img }') no-repeat scroll center center / cover`, name:this.data[this.index].name, des:this.data[this.index].des  });
		});
	}

	componentWillUnmount() {
		$(this.refs.b).off();
		$(this.refs.btn).off();
		$(this.refs.arr).off();
		$(this.refs.arl).off();
	}

	appendDes()
	{
		return this.state.des;
	}

	appendName()
	{
		return this.state.name.split('<br />').join('');
	}

	appendImg()
	{
		return { background:this.state.img }
	}

	render() {
		return ( 
			<div ref='main' id='popup'>
				<div ref='b' class='b'></div>
				<div class='c'>
					<div ref='photo' class='photo' style={ this.appendImg() }>
						<div ref='arl' class='arr l'></div>
						<div ref='arr' class='arr r'></div>
					</div>
					<div class='txt'>
						<div class='l'></div>
						<div ref='h' class='h'>
							{ this.appendName() }
						</div>
						<div class='d'>
							{ this.appendDes() }
						</div>
					</div>
				</div>
				<div ref='btn' class='popup-close'></div>
			</div>
		);
	}
}

