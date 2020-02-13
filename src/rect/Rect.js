import React from 'react';
import './Rect.css';

class Rect extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	onChangeMode() {
		const props = this.props;

		props.onChangeMode(props.mode);
	}

	render() {
		return (
			<button onClick={this.onChangeMode}
					className={"rect"}>{this.props.mode}</button>
		);
	}
}

export default Rect;