import React from 'react';
import './Arc.css';

class Arc extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	onChangeMode() {
		this.props.onChangeMode(this.props.mode);
	}

	render() {
		return (
			<button onClick={this.onChangeMode}
					className={"line"}>{this.props.mode}</button>
			// <select onChange={this.onChangeMode}>
			// 	<option value="arcfill">fill</option>
			// 	<option value="arcstroke">stroke</option>
			// </select>
		);
	}
}

export default Arc;