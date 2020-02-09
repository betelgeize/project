import React from 'react';
import './History.css';

class History extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const props = this.props.ctx;
		let arr = [];

		for (let key in props) {
			if (typeof props[key] !== 'function') {
				arr.push(key + ': ' + props[key]);
			}
		}
		return (
			<div className="history">
				{arr.length && arr.map(item => <p key={item.id}>{item}</p>)}
			</div>
		);
	}
}

export default History;