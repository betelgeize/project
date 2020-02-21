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
		this.mouseDown = false;
	}

	componentDidMount() {
		const canvas = this.canvasOne.current;
		const ctx = canvas.getContext('2d');

		var defaultCtx = {};
		for (let key in ctx) {
			if (typeof ctx[key] !== 'function' && typeof ctx[key] !== 'object') {
				defaultCtx[key] = ctx[key];
			}
		}
		this.props.getDefaultCtx(defaultCtx);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const canvas = this.canvasOne.current;
		const ctx = canvas.getContext('2d');

		// console.log(this.props.defaultCtx);
		const defaultCtx = this.props.defaultCtx;
		for (let key in defaultCtx) {
			ctx[key] = defaultCtx[key];
		}
		ctx.clearRect(0,0, canvas.width, canvas.height);
		this.props.historyFunc.forEach(item => {
				item.func(item.coords)(ctx);
			}
			/*itemFunc => {
			itemFunc(ctx);
		}*/);
	}

	onClick(e) {
		// console.log('onClick');
	}

	onMouseDown(e) {
		const currentPointX = this.getCurrentCoords(e).x;
		const currentPointY = this.getCurrentCoords(e).y;
		let {mode} = this.props;

		this.startX = currentPointX;
		this.startY = currentPointY;
		this.mouseDown = true;
		if (mode === 'line' || mode === 'closeLine' || mode === 'straightLine') {
			this.props.getAction(ctx => {
				ctx.beginPath();
				ctx.moveTo(currentPointX, currentPointY);
			})
		}
	}

	onMouseMove(e) {
		let {mode} = this.props;
		if (this.mouseDown && (mode === 'line' || mode === 'closeLine')) {
			const currentPointX = this.getCurrentCoords(e).x;
			const currentPointY = this.getCurrentCoords(e).y;

			this.props.getAction(ctx => {
				ctx.lineTo(currentPointX, currentPointY);
				ctx.stroke();
			})
		}
	}

	onMouseUp(e) {
		const startPointX = this.startX;
		const startPointY = this.startY;
		const finishPointX = this.getCurrentCoords(e).x;
		const finishPointY = this.getCurrentCoords(e).y;
		let {mode} = this.props;

		let rectCoords = () => {
			return [startPointX, startPointY, finishPointX - startPointX, finishPointY - startPointY];
		};
		let arcCoords = () => {
			let radius = Math.sqrt(Math.pow(finishPointY - startPointY, 2) + Math.pow(finishPointX - startPointX, 2));
			return [startPointX, startPointY, radius, 0, 2 * Math.PI, false]
		};
		let drawFunc;

		this.mouseDown = false;
		if (mode === 'fill' || !mode) {
			this.props.getAction({
				func : (coords) => (ctx) => {
					ctx.fillRect(...coords);
				},
				coords : rectCoords()
			});
			return;
			// drawFunc = ctx => {
			// 	ctx.fillRect(...rectCoords());
			// };
		} else if (mode === 'stroke') {
			drawFunc = ctx => {
				ctx.strokeRect(...rectCoords());
			};
		} else if (mode === 'clear') {
			drawFunc = ctx => {
				ctx.clearRect(...rectCoords());
			};
		} else if (mode === 'arcfill') {
			drawFunc = ctx => {
				ctx.beginPath();
				ctx.arc(...arcCoords());
				ctx.fill();
			};
		} else if (mode === 'arcstroke') {
			drawFunc = ctx => {
				ctx.beginPath();
				ctx.arc(...arcCoords());
				ctx.stroke();
			};
		} else if (mode === 'line' || mode === 'straightLine') {
			drawFunc = ctx => {
				ctx.lineTo(finishPointX, finishPointY);
				ctx.stroke();
			};
		} else if (mode === 'closeLine') {
			drawFunc = ctx => {
				ctx.lineTo(finishPointX, finishPointY);
				ctx.closePath();
				ctx.stroke();
			};
		}
		this.props.getAction(drawFunc);
	}

	getCurrentCoords(e) {
		const canvas = this.canvasOne.current;
		const currentRect = canvas.getBoundingClientRect();
		return {
			x : Math.round(e.clientX - currentRect.left),
			y : Math.round(e.clientY - currentRect.top)
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