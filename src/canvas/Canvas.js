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
		this.arrXY = [];
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

		const defaultCtx = this.props.defaultCtx;
		for (let key in defaultCtx) {
			ctx[key] = defaultCtx[key];
		}
		ctx.clearRect(0,0, canvas.width, canvas.height);
		this.props.historyFunc.forEach((item, ...arr) => {
			item.func(item.coords)(ctx);
		});
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
			// this.props.getAction(ctx => {
			// 	ctx.beginPath();
			// 	ctx.moveTo(currentPointX, currentPointY);
			// })
		}
	}

	onMouseMove(e) {
		let {mode} = this.props;
		if (this.mouseDown && (mode === 'line' || mode === 'closeLine')) {
			const currentPointX = this.getCurrentCoords(e).x;
			const currentPointY = this.getCurrentCoords(e).y;

			this.arrXY.push(currentPointX, currentPointY)
			// this.props.getAction(ctx => {
				// ctx.lineTo(currentPointX, currentPointY);
				// ctx.stroke();
			// })
		}
	}

	onMouseUp(e) {
		const startPointX = this.startX;
		const startPointY = this.startY;
		const finishPointX = this.getCurrentCoords(e).x;
		const finishPointY = this.getCurrentCoords(e).y;
		let {mode} = this.props;

		const rectCoords = () => {
			return [startPointX, startPointY, finishPointX - startPointX, finishPointY - startPointY];
		};
		const arcCoords = () => {
			let radius = Math.round(Math.sqrt(Math.pow(finishPointY - startPointY, 2) + Math.pow(finishPointX - startPointX, 2)));
			return [startPointX, startPointY, radius, 0, 2 * Math.PI, false]
		};
		const lineCoords = () => {
			return [startPointX, startPointY, finishPointX, finishPointY];
		};
		const manyLineCoords = () => {
			return [startPointX, startPointY].concat(this.arrXY, finishPointX, finishPointY);
		};
		// const toString2 = (val) => `${val}`;
		const func = (arr, ctx) => {
			let xs = arr.filter((item, i) => !(i % 2));
			let ys = arr.filter((item, i) => i % 2);

			if (ctx) {
				ctx.beginPath();
				xs.reduce((prev, cur, i) => {
					return prev + (i ? ctx.lineTo(cur, ys[i]) : ctx.moveTo(cur, ys[i]));
				}, '');
			} else {
				let str = 'ctx.beginPath();';
					str += xs.reduce((prev, cur, i) => {
						return prev + (i ? `ctx.lineTo(${cur}, ${ys[i]});` : `ctx.moveTo(${cur}, ${ys[i]});`);
					}, '');

				return str;
			}
		};
		let drawObj;

		if (mode === 'fill') {
			drawObj = {
				func : (coords) => (ctx) => {
					ctx.fillRect(...coords);
				},
				funcStr : `ctx.fillRect(${rectCoords()})`,
				coords : rectCoords()
			};
		} else if (mode === 'stroke') {
			drawObj = {
				func : (coords) => (ctx) => {
					ctx.strokeRect(...coords);
				},
				funcStr : `ctx.strokeRect(${rectCoords()})`,
				coords : rectCoords()
			};
		} else if (mode === 'clear') {
			drawObj = {
				func : (coords) => (ctx) => {
					ctx.clearRect(...coords);
				},
				funcStr : `ctx.clearRect(${rectCoords()})`,
				coords : rectCoords()
			};
		} else if (mode === 'arcfill') {
			drawObj = {
				func : (coords) => (ctx) => {
					ctx.beginPath();
					ctx.arc(...coords);
					ctx.fill();
				},
				funcStr : `ctx.beginPath();
				ctx.arc(${arcCoords()});
				ctx.fill();`,
				coords : arcCoords()
			};
		} else if (mode === 'arcstroke') {
			drawObj = {
				func : (coords) => (ctx) => {
					ctx.beginPath();
					ctx.arc(...coords);
					ctx.stroke();
				},
				funcStr : `ctx.beginPath();
					ctx.arc(${arcCoords()});
					ctx.stroke();`,
				coords : arcCoords()
			};
		} else if (mode === 'line' || mode === 'straightLine') {
			drawObj = {
				func : (coords) => (ctx) => {
					func(coords, ctx);
					ctx.stroke();
				},
				funcStr : `${func(manyLineCoords())}
					ctx.stroke();`,
				coords : manyLineCoords()
			};
		} else if (mode === 'closeLine') {
			drawObj = {
				func : (coords) => (ctx) => {
					func(coords, ctx);
					ctx.closePath();
					ctx.stroke();
				},
				funcStr : `${func(manyLineCoords())}
					ctx.closePath();
					ctx.stroke();`,
				coords : manyLineCoords()
			};
		}
		this.mouseDown = false;
		this.props.getAction(drawObj);
		this.arrXY = [];
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