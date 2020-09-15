import React from "react";
import './ImageInput.less';

import EXIF from 'exif-js';

export default class ImageInput extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		
	}

	set({ file, length = this.props.length || 500, cb })
	{
		var root = this;
		var ctx = this.refs.canvas.getContext('2d');

		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = e => {
			var img = new Image();
			img.onload = function() {
				var max_Length = length;
				var imgWidth = img.width;
				var imgHeight = img.height;
				if (imgWidth > imgHeight) {
					if (imgWidth > max_Length) {
						imgHeight = Math.round(imgHeight *= max_Length / imgWidth);
						imgWidth = max_Length;
					}
				} else {
					if (imgHeight > max_Length) {
						imgWidth = Math.round(imgWidth *= max_Length / imgHeight);
						imgHeight = max_Length;
					}
				}
				root.refs.canvas.width = imgWidth;
				root.refs.canvas.height = imgHeight;

				EXIF.getData(img, e => {
					var o = EXIF.getTag(this , 'Orientation');
					if (o == 6 || o == 8 || o == 3) {
						var rotateAngle = 0;
						switch (o) {
							case 3:
								rotateAngle = 180;
								break;
							case 6:
								rotateAngle = 90;
								root.refs.canvas.width = imgHeight;
								root.refs.canvas.height = imgWidth;
								break;
							case 8:
								rotateAngle = -90;
								root.refs.canvas.width = imgHeight;
								root.refs.canvas.height = imgWidth;
								break;
						}

						var x = root.refs.canvas.width / 2;
						var y = root.refs.canvas.height / 2;

						ctx.translate(x, y);
						ctx.rotate(rotateAngle * Math.PI / 180);

						ctx.drawImage(img, (-imgWidth / 2), (-imgHeight / 2), imgWidth, imgHeight);
					} else {
						ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
					}
					cb(root.refs.canvas.toDataURL("image/png", 1.0));
				});
			}
			img.src = e.target.result;
		}

	}

	_capture()
	{
		this.refs.input.click();
	}

	_onchange(e)
	{
		var file = e.target.files[0];
		this.set({ file:file , cb:(e)=>{if( this.props.onend ) this.props.onend(e); }});
	}

	_append()
	{
		if(this.props.img) return <img onClick={ this._capture.bind(this) } src={ this.props.img } />
		else return <button onClick={ this._capture.bind(this) } style={ this.props.style ? this.props.style : '' }>{ this.props.txt ? this.props.txt : 'Capture' }</button>
	}

	render() {
		return ( 
			<div ref='main' id='__ImageInput__'>
				{ this._append() }
				<input ref='input' onChange={ this._onchange.bind(this) } type="file" accept="image/*" capture="camera"/>
				<canvas ref='canvas'></canvas>
			</div>
		);
	}
}

