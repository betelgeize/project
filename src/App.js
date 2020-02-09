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
			mode: ''
		};
		this.state = this.initialState;
		this.getDefaultCtx = this.getDefaultCtx.bind(this);
		// this.reloadCtx = this.reloadCtx.bind(this);
		this.onChangeMode = this.onChangeMode.bind(this);
	}


	getDefaultCtx(ctx) {
		this.setState(() => ({
				ctx
			}
		))
	}

	reloadCtx(ctx) {
		debugger;
		// this.setState(() => ({
		// 		ctx
		// 	}
		// ));
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
					<Rect onChangeMode={this.onChangeMode}/>
					<Arc onChangeMode={this.onChangeMode}/>
					<Line onChangeMode={this.onChangeMode}/>
					<Line onChangeMode={this.onChangeMode} closePath/>
				</div>
				<div>
					Свойства
					<Color ctx={this.state.ctx} fillStyle/>
					<Color ctx={this.state.ctx} strokeStyle/>
				</div>
				<div>
					Текст
					<Color ctx={this.state.ctx} shadowColor/>
				</div>
				<Canvas getDefaultCtx={this.getDefaultCtx}
						ctx={this.state.ctx}
						mode={this.state.mode}
				/>
				<History ctx={this.state.ctx}/>

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
