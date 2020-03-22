import React from 'react';
import './History.css';

class History extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="history">
				{this.props.historyFunc.map((item, id) => <p key={id}>{id}: {item.funcStr}</p>).reverse()}
			</div>
		);
	}
}

export default History;