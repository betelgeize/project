import React from 'react';
import logo from './logo.svg';
import './App.css';

import Rect from "./rect/Rect";
import Arc from "./arc/Arc";
import Line from "./line/Line";
import Color from "./color/Color";
import Canvas from './canvas/Canvas'
import History from "./history/History"

class App extends React.Component {
	constructor() {
		super();
		this.initialState = {
			ctx: {},
			mode: '',
			historyFunc: [],
			defaultCtx: {}
		};
		this.state = this.initialState;
		this.getDefaultCtx = this.getDefaultCtx.bind(this);
		this.getAction = this.getAction.bind(this);
		this.onChangeMode = this.onChangeMode.bind(this);
	}

	getDefaultCtx(defaultCtx) {
		this.setState(() => ({
			defaultCtx
		}))
	}

	getAction(func) {
		this.setState((prevState) => ({
			historyFunc: prevState.historyFunc.concat(func)
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
					<Rect onChangeMode={this.onChangeMode} mode = 'fill'/>
					<Rect onChangeMode={this.onChangeMode} mode = 'stroke'/>
					<Rect onChangeMode={this.onChangeMode} mode = 'clear'/>
					<Arc onChangeMode={this.onChangeMode} mode = 'arcfill'/>
					<Arc onChangeMode={this.onChangeMode} mode = 'arcstroke'/>
					<Line onChangeMode={this.onChangeMode} mode = 'line'/>
					<Line onChangeMode={this.onChangeMode} mode = 'straightLine'/>
					<Line onChangeMode={this.onChangeMode} mode = 'closeLine'/>
					<Line onChangeMode={this.onChangeMode} mode = 'bezierCurve'/>
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
