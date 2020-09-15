import React from "react";
import './Loading.less';
import $ from "jquery";

export default class Loading extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.r = 0;
		//scripts
	}

	componentDidMount() {
		this.frame = setInterval(()=>{ 
			this.rotation( $(this.refs.c), this.r++ );
		},100);
	}

	rotation(e,s)
	{
		e.css({
			'transform': `rotate(${ s * 20 }deg)`,
			'-webkit-transform': `rotate(${ s * 20 }deg)`,
			'-moz-transform': `rotate(${ s * 20 }deg)`,
			'-o-transform': `rotate(${ s * 20 })`,
			'-ms-transform': `rotate(${ s * 20 }deg)`
		});
	}

	componentWillUnmount()
	{
		clearInterval(this.frame);
	}

	__getElm()
	{
		var op = [];
		for(var i = 0; i < 18; i ++)
		{
			op.push( <div key={ 'l' + i } className={ this.props.color ? 'l' : ('l' + (this.props.style ? ' ' + this.props.style : '')) } style={ this.props.color ? { background:this.props.color, opacity:.06 * i , 'WebkitTransform': 'rotate('+ ( 20 * i ) +'deg)' } : { opacity:.06 * i , 'WebkitTransform': 'rotate('+ ( 20 * i ) +'deg)' } }></div> )
		}
		return op;
	}

	render() {
		return ( 
			<div id='_lesca_loading_'>
				<div className={ 'bg' + ( this.props.bg ? '' : ( this.props.style ? ' ' + this.props.style : ' dark') ) } style={ this.props.bg ? { background:this.props.bg } : {} } >
					<div ref='c' className="c">
						{ this.__getElm() }
					</div>
					<div className={ 'text' + ( this.props.color ? '' : ( this.props.style ? ' t' + this.props.style : ' tdark') ) } style={ this.props.color ? { color:this.props.color } : {} } > { this.props.text ? this.props.text : '' } </div>
				</div>
			</div>
		);
	}
}

