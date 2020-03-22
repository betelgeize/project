import React from 'react';
import logo from './logo.svg';
import './App.css';

import Rect from "./rect/Rect";
import Arc from "./arc/Arc";
import Line from "./line/Line";
import Color from "./color/Color";
import Canvas from './canvas/Canvas'
import CurrentShape from './currentShape/CurrentShape'
import History from "./history/History"

class App extends React.Component {
	constructor() {
		super();
		this.initialState = {
			ctx: {},
			mode: 'fill',
			historyFunc: [],
			currentCoords: [],
			defaultCtx: {}
		};
		this.state = this.initialState;
		this.getDefaultCtx = this.getDefaultCtx.bind(this);
		this.getAction = this.getAction.bind(this);
		this.onChangeMode = this.onChangeMode.bind(this);
		this.onChangeFromCurrentShape = this.onChangeFromCurrentShape.bind(this);
	}

	getDefaultCtx(defaultCtx) {
		this.setState(() => ({
			defaultCtx
		}))
	}

	getAction(obj) {
		this.setState((prevState) => ({
			historyFunc: prevState.historyFunc.concat([obj]),
			currentCoords: obj.coords
		}))
	}

	onChangeFromCurrentShape(coords) {
		this.setState((prevState) => ({
			historyFunc: prevState.historyFunc.map((item, i, arr) => {
				return (i === arr.length - 1) ? {
					func : item.func,
					coords
				} : item;
			}),
			currentCoords : coords
		}))
	}

	onChangeMode(mode) {
		this.setState(() => ({
				mode
			}
		))
	}

	render() {
		return (
			<div className="App">
				Canvas online
				<div>
					<Rect onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'fill'/>
					<Rect onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'stroke'/>
					<Rect onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'clear'/>
					<Arc onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'arcfill'/>
					<Arc onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'arcstroke'/>
					<Line onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'line'/>
					<Line onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'straightLine'/>
					<Line onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'closeLine'/>
					<Line onChangeMode={this.onChangeMode} pressedBtn = {this.state.mode} mode = 'bezierCurve'/>
				</div>
				<div>
					Свойства
					<Color getAction={this.getAction} mode = 'fillStyle'/>
					<Color getAction={this.getAction} mode = 'strokeStyle'/>
				</div>
				<div>
					Текст
					<Color  getAction={this.getAction} mode = 'shadowColor'/>
				</div>
				<Canvas
					getAction={this.getAction}
					getDefaultCtx={this.getDefaultCtx}
					defaultCtx={this.state.defaultCtx}
					mode={this.state.mode}
					historyFunc={this.state.historyFunc}
				/>
				<div>
					{this.state.currentCoords && this.state.currentCoords.length ? <CurrentShape
						mode={this.state.mode}
						currentCoords={this.state.currentCoords}
						onChangeFromCurrentShape = {this.onChangeFromCurrentShape} /> : ''}
				</div>
				{this.state.historyFunc.length ? <History historyFunc={this.state.historyFunc} /> : ''}
			</div>
		);
	}
}

export default App;
