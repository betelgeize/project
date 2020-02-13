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
			drawFunc;

		if (mode === 'fillStyle') {
			drawFunc = ctx => {
				ctx.fillStyle = val;
			};
		} else if (mode === 'strokeStyle') {
			drawFunc = ctx => {
				ctx.strokeStyle = val;
			};
		} else if (mode === 'shadowColor') {
			drawFunc = ctx => {
				ctx.shadowColor = val;
			};
		}
		this.props.getAction(drawFunc)
	}

	render() {
		return (
			<input type="color" id="textFillColor" defaultValue="#000000" onChange={this.onChangeColor}/>
		);
	}
}

export default Color;