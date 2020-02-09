import React from 'react';
import './Rect.css';

class Rect extends React.Component {
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
				<option value="fill">fill</option>
				<option value="stroke">stroke</option>
				<option value="clear">clear</option>
			</select>
		);
	}
}

export default Rect;