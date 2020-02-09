import React from 'react';
import './Color.css';

class Color extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeColor = this.onChangeColor.bind(this);
	}

	onChangeColor(e) {
		let props = this.props,
			ctx = props.ctx,
			val = e.target.value;

		if (props.fillStyle) {
			ctx.fillStyle = val;
		} else if (props.strokeStyle) {
			ctx.strokeStyle = val;
		} else if (props.shadowColor) {
			ctx.shadowColor = val;
		}
	}

	render() {
		return (
			<input type="color" id="textFillColor" defaultValue="#FF0000" onChange={this.onChangeColor}/>
		);
	}
}

export default Color;