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
		debugger;
		return (
			<button onClick={this.onChangeMode}
					className={this.props.clicked === this.props.mode ? 'clickedBtn' : ''} >{this.props.mode}</button>
		);
	}
}

export default Rect;