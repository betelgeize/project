import React from 'react';

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
					className={this.props.clicked === this.props.mode ? 'clickedBtn' : ''}>{this.props.mode}</button>
			// <select onChange={this.onChangeMode}>
			// 	<option value="arcfill">fill</option>
			// 	<option value="arcstroke">stroke</option>
			// </select>
		);
	}
}

export default Arc;