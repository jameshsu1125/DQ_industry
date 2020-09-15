import React from "react";
import './recycle.less';

import History from './history';
import Popup from './popup';
import Data from './recycle-data';

import $ from "jquery";
import Device from 'DEVICE/UserAgent';
require("jquery-easing");

export default class recycle extends React.Component {

	constructor(props) {
		super(props);
		const root = this;

		this.state = { popup: false };

		this.index = 0;

		this.data = Data;
		

		this.tr = {
			init:function()
			{
				this.page.init();
				this.history.init();
			},
			history:{ x:0, is:false,
				init:function(){
					this.c = $(root.refs.history);
					this.evt();
				},
				evt:function(){
					this.device = Device.get() == 'mobile';
					if(!this.device)
					{
						this.c.mousedown((e)=>{
							this.x = e.clientX;
							this.is = true;
						});

						this.c.mousemove((e)=>{

							if(!this.is) return;

							var x = e.clientX;
							var dx = this.x - x;
							root.tr.page.move(dx);
						});

						$(window).mouseup((e)=>{
							this.is = false;
							root.tr.page.set();
						});
					}
					else
					{
						root.refs.history.addEventListener('touchstart', (e)=> {
							this.x = e.touches[0].clientX;
							this.is = true;
						}, { passive: false, capture: false });

						root.refs.history.addEventListener('touchmove', (e)=> {
							if(!this.is) return;
							var x = e.touches[0].clientX;
							var dx = this.x - x;
							root.tr.page.move(dx);
						}, { passive: false, capture: false });

						document.addEventListener('touchend', (e)=> {
							this.is = false;
							root.tr.page.set();
						}, { passive: false, capture: false });

					}
				}
			},
			page:{ x:15, ox:15, min:15, max:0, 
				init:function(){
					this.c = $(root.refs.container);
					this.r = $(root.refs.rows);

					this.ar = $(root.refs.arr);
					this.al = $(root.refs.arl);
					this.al.hide();
					
					this.resize();
					$(window).resize(()=>this.resize());

					this.ar.click(()=>{
						this.moveTo(false)
					});

					this.al.click(()=>{
						this.moveTo(true)
					});

					this.tran();
				},
				moveTo:function(is)
				{
					var x = is ? this.x + 500 : this.x - 500;
					x = x > this.min ? this.min : x;
					x = x < this.max ? this.max : x;

					$(this).animate({
						x: x
					},{
						duration: 500,
						step:()=>this.tran(),
						complete:()=>{this.tran(); this.set();},
						easing:'easeOutQuart'
					});
					
				},
				move:function(dx){
					this.x = this.ox - dx;
					this.x = this.x > this.min ? this.min : this.x;
					this.x = this.x < this.max ? this.max : this.x;
					this.tran();
				},
				set:function(){
					this.ox = this.x;
				},
				tran:function(){

					this.c.css({
						left: this.x + 'px'
					});

					if(this.x == this.min) this.al.hide(100);
					else this.al.show(100);
					if(this.x == this.max) this.ar.hide(100);
					else this.ar.show(100);
				},
				resize:function()
				{
					this.w = 1300;
					this.w2 = this.r.width();

					if(this.w < this.w2) this.max = 15;
					else
					{
						this.max = this.w2 - this.w;
					}
					this.move(0);
				}
			}
		}
	}

	componentDidMount() {
		this.tr.init();
	}

	appendLine()
	{
		var op = [];
		for(var i = 0; i < 70; i++)
		{
			op.push(<div key={i} class='l' style={ { left:`${ i * 19 }px` } }></div>);
		}
		return op;
	}

	appendEvent()
	{
		var op = [];
		for(var i = 0; i < this.data.length; i++)
		{
			op.push(<History key={i} index={i} data={ this.data[i] } open={ this.openpopup.bind(this) }/>)
		}
		return op;
	}

	popupend()
	{
		this.setState({ popup: false });
	}

	openpopup(index)
	{
		this.index = index;
		this.setState({ popup: true});
	}

	appendPopup()
	{
		if(this.state.popup) return <Popup index={ this.index } data={ this.data } end={ this.popupend.bind(this) } />;
	}

	render() {
		return ( 
			<div id='recycle'>
				<div class='rows'>
					<h2>
						懂回收才是真環保
					</h2>
					<p>
						協治企業成立於民國74年，早期經營太空包回收再利用買賣及工廠各類下腳品回收買賣業務。<br />
						民國77年，環保署修訂廢棄物清理法明定回收責任，本公司於79年轉型投入塑膠容器回收產業，以「點線面」宣導民眾回收觀念及擴充回收來源，並不斷精進分類技術及設備，提高材質分選品質。<br />
						目前為全台最具規模之塑膠容器回收業者，於屏東、高雄與台南共設有回收廠共4廠，其中塑膠每月平均回收量達3000噸。<br />
						為達到回收與處理之結合，本公司於民國98年成立協治塑膠工業，現階段為環保署核准設立之受補貼機構處理廠，可處理清洗回收廠生產之PET、PP、PE、PS、PVC、PLA瓶磚，並可於回收、分選及處理端同時管控，確保生產瓶片品質。<br />
						本公司目標致力於回收、處理及應用，落實資源循環使用，為環境未來盡一份心力。
					</p>
				</div>
				<div ref='rows' class='rows'>
					<div class='history'>
						<div ref='history' class='over'>
							<div ref='container' class='container'>
								<div class='timeline'>
									{ this.appendLine() }
								</div>
								<div class='events'>
									{ this.appendEvent() }
								</div>
							</div>
						</div>
						<div ref='arr' class='arr r'></div>
						<div ref='arl' class='arr l'></div>
					</div>
				</div>
				{ this.appendPopup() }
			</div>
		);
	}
}

