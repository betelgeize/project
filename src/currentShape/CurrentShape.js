import React from 'react';

class CurrentShape extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	onChangeMode(e) {
		this.props.onChangeFromCurrentShape([...e.currentTarget.elements].map(item => Number(item.value)));
	}

	render() {
		let {mode} = this.props;
		if (mode === 'fill' || mode === 'stroke' || mode === 'clear') {
			let [x, y, width, height] = this.props.currentCoords;

			return (
				<form onChange={this.onChangeMode}>
					<label>x<input type='number' value={x || ''} /></label>
					<label>y<input type='number' value={y || ''} /></label>
					<label>width<input type='number' value={width || ''} /></label>
					<label>height<input type='number' value={height || ''} /></label>
				</form>
			);
		} else if (mode === 'arcfill' || mode === 'arcstroke' ) {
			let [x, y, r, sAng, eAng, counterclockwise] = this.props.currentCoords;

			return (
				<form onChange={this.onChangeMode}>
					<label>x<input type='number' value={x || ''} /></label>
					<label>y<input type='number' value={y || ''} /></label>
					<label>r<input type='number' value={r || ''} /></label>
					<label>sAng<input type='number' value={sAng || 0} /></label>
					<label>eAng<input type='number' value={eAng || ''} /></label>
					<label>counterclockwise<input type='checkbox' value={counterclockwise || ''} /></label>
				</form>
			);
		} else {
			return '<h1>text</h1>';
		}
	}
}

export default CurrentShape;