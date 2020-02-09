import React from 'react';
import './Canvas.css';

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.defaultCtx = {};
		this.canvasOne = React.createRef();
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onClick = this.onClick.bind(this);
		this.startX = 0;
		this.startY = 0;
		this.ctx = {};
		this.mouseDown = false;
	}

	componentDidMount() {
		const canvas = this.canvasOne.current;
		const ctx = canvas.getContext('2d');

		this.ctx = ctx;
		this.props.getDefaultCtx(ctx);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	onClick(e) {
		// console.log('onClick');
	}

	onMouseDown(e) {
		const canvas = this.canvasOne.current;
		const currentRect = canvas.getBoundingClientRect();
		const ctx = canvas.getContext('2d');

		this.startX = e.clientX - currentRect.left;
		this.startY = e.clientY - currentRect.top;
		this.mouseDown = true;
		if (this.props.mode === 'line' || this.props.mode === 'closeLine') {
			ctx.beginPath();
			ctx.moveTo(this.startX, this.startY);
		}
	}

	onMouseMove(e) {
		const canvas = this.canvasOne.current;
		const ctx = canvas.getContext('2d');

		if (this.mouseDown && (this.props.mode === 'line' || this.props.mode === 'closeLine')) {
			const currentRect = canvas.getBoundingClientRect();
			ctx.lineTo(e.clientX - currentRect.left, e.clientY - currentRect.top);
			ctx.stroke()
		}
	}

	onMouseUp(e) {
		const canvas = this.canvasOne.current;
		const ctx = canvas.getContext('2d');
		const currentRect = canvas.getBoundingClientRect();
		const startPointX = this.startX;
		const startPointY = this.startY;
		const finishPointX = e.clientX - currentRect.left;
		const finishPointY = e.clientY - currentRect.top;
		let arrCoords = [startPointX, startPointY, finishPointX - this.startX, finishPointY - this.startY];
		let radius = Math.sqrt(Math.pow(finishPointY - startPointY, 2) + Math.pow(finishPointX - startPointX, 2));

		this.mouseDown = false;
		if (this.props.mode === 'fill' || !this.props.mode) {
			ctx.fillRect(...arrCoords);
		} else if (this.props.mode === 'stroke') {
			ctx.strokeRect(...arrCoords);
		} else if (this.props.mode === 'clear') {
			ctx.clearRect(...arrCoords);
		} else if (this.props.mode === 'arcfill') {
			ctx.beginPath();
			ctx.arc(startPointX, startPointY, radius, 0, 2 * Math.PI, false);
			ctx.fill();
		} else if (this.props.mode === 'arcstroke') {
			ctx.beginPath();
			ctx.arc(startPointX, startPointY, radius, 0, 2 * Math.PI, false);
			ctx.stroke();
		} else if (this.props.mode === 'line') {
			ctx.lineTo(finishPointX, finishPointY);
			ctx.stroke();
		} else if (this.props.mode === 'closeLine') {
			ctx.lineTo(finishPointX, finishPointY);
			ctx.closePath();
			ctx.stroke();
		}
	}

	render() {
		return (
			<canvas width="1000" height="500"
					onMouseDown={this.onMouseDown}
					onMouseMove={this.onMouseMove}
					onMouseUp={this.onMouseUp}
					onClick={this.onClick}
					ref={this.canvasOne}
					className="canvas">
				Your browser does not support HTML5 Canvas.
			</canvas>
		);
	}
}

export default Canvas;