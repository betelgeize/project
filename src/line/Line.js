import React from 'react';
import './Line.css';

class Line extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	onChangeMode(e) {
		if (this.props.closePath) {
			this.props.onChangeMode('closeLine');
		} else {
			this.props.onChangeMode('line');
		}
	}

	render() {
		return (
			<button onClick={this.onChangeMode}
					className={"line"}>{this.props.closePath ? "ClosePathLine" : "Line"}</button>
		);
	}
}

export default Line;