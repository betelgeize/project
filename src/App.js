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
			mode: '',
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
			historyFunc: prevState.historyFunc.concat([obj]),//.func(obj.coords)),
			currentCoords: obj.coords
		}))
	}

	onChangeFromCurrentShape(currentCoords) {
		this.setState((prevState) => ({
			historyFunc: prevState.historyFunc.map((item, i, arr) => {
					if (i === arr.length - 1) {
						return {
							func : item.func,
							coords : currentCoords
						};
					}
				})//,
			// currentCoords
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
					<CurrentShape currentCoords={this.state.currentCoords}
								  onChangeFromCurrentShape = {this.onChangeFromCurrentShape} />
				</div>
				{/*<History ctx={this.state.ctx}/>*/}

				{/*<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>*/}
			</div>
		);
	}
}

export default App;
