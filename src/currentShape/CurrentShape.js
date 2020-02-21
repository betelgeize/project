import React from 'react';

class CurrentShape extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			valueX: '',
			valueY: '',
			valueWidth: '',
			valueHeight: '',
		};

		this.onChangeModeX = this.onChangeModeX.bind(this);
	}

	onChangeModeX(e) {
		this.setState({
			valueX: Number(e.target.value)
		});
	}

	// shouldComponentUpdate(nextProps, nextState, nextContext) {

	// }

	componentDidUpdate(prevProps, prevState, snapshot) {

	}


	render() {
		return (
			<form>
				<label>x<input type='number' value={this.state.valueX} onChange={this.onChangeModeX}/></label>
				{/*<label>y<input type='number' value={this.state.valueY} onChange={this.onChangeModeY}/></label>*/}
				{/*<label>width<input type='number' value={this.state.valueWidth} onChange={this.onChangeModeWidth}/></label>*/}
				{/*<label>height<input type='number' value={this.state.valueHeight} onChange={this.onChangeModeHeight}/></label>*/}
			</form>
		);
	}
}

export default CurrentShape;