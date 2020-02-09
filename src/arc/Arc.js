import React from 'react';
import './Arc.css';

class Arc extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	onChangeMode(e) {
		this.props.onChangeMode(e.target.value);
	}

	render() {
		return (
			<select onChange={this.onChangeMode}>
				<option value="arcfill">fill</option>
				<option value="arcstroke">stroke</option>
			</select>
		);
	}
}

export default Arc;