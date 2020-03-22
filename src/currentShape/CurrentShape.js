import React from 'react';
import {getRads, getDegs} from '../util/Util'

class CurrentShape extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeMode = this.onChangeMode.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onChangeInput(e) {}

	onChangeMode(e) {
		this.props.onChangeFromCurrentShape([...e.currentTarget.elements].map(item => {
			if (item.name === 'eAng' || item.name === 'sAng') {
				return getRads(Number(item.value))
			} else {
				return Number(item.value)
			}
		}));
	}

	renderInput(str, val, defaultValue) {
		return (
			<label>{str}<input type='number' name={str} value={val || defaultValue} onChange={this.onChangeInput}/></label>
		)
	}

	render() {
		let {mode} = this.props;
		if (mode === 'fill' || mode === 'stroke' || mode === 'clear') {
			let [x, y, width, height] = this.props.currentCoords;

			return (
				<form onChange={this.onChangeMode}>
					{this.renderInput('x', x)}
					{this.renderInput('y', y)}
					{this.renderInput('width', width)}
					{this.renderInput('height', height)}
				</form>
			);
		} else if (mode === 'arcfill' || mode === 'arcstroke' ) {
			let [x, y, r, sAng, eAng, counterclockwise] = this.props.currentCoords;
			sAng = Math.round(getDegs(sAng)) || '0';
			eAng = Math.round(getDegs(eAng));
			return (
				<form onChange={this.onChangeMode}>
					{this.renderInput('x', x)}
					{this.renderInput('y', y)}
					{this.renderInput('r', r)}
					{this.renderInput('sAng', sAng)}
					{this.renderInput('eAng', eAng)}
					<label>counterclockwise<input type='checkbox' value={counterclockwise || ''} /></label>
				</form>
			);
		} else {
			return '<h1>text</h1>';
		}
	}
}

export default CurrentShape;