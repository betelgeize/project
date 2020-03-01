import React from 'react';
import './Color.css';

class Color extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeColor = this.onChangeColor.bind(this);
	}

	onChangeColor(e) {
		let mode = this.props.mode,
			val = e.target.value,
			drawObj;

		if (mode === 'fillStyle') {
			drawObj = {
				func : () => ctx => {
					ctx.fillStyle = val;
				}
			};
		} else if (mode === 'strokeStyle') {
			drawObj = {
				func : () => ctx => {
					ctx.strokeStyle = val;
				}
			};
		} else if (mode === 'shadowColor') {
			drawObj = {
				func : () => ctx => {
					ctx.shadowColor = val;
				}
			};
		}
		this.props.getAction(drawObj)
	}

	render() {
		return (
			<input type="color" id="textFillColor" defaultValue="#000000" onChange={this.onChangeColor}/>
		);
	}
}

export default Color;