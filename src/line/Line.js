import React from 'react';
import './Line.css';

class Line extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	onChangeMode(e) {
		this.props.onChangeMode(this.props.mode);
	}

	render() {
		return (
			<button onClick={this.onChangeMode}
					className={"line"}>{this.props.mode}</button>
		);
	}
}

export default Line;