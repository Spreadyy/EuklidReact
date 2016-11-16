import React, { Component } from 'react';
import './App.css';

import EuklidRow from './EuklidRow';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { x: 1, y: 1 };
	}

	handleChangeX = (value) => {
		this.setState({
			x: parseInt(value, 10)
		});
	}

	handleChangeY = (value) => {
		this.setState({
			y: parseInt(value, 10)
		});
	}

	getInitialRow = (x, y) => {
		return ({
			first: true,
			x: x,
			y: y,
			q: this.calcQ(x, y),
			r: this.calcR(x, y),
			u: 1,
			s: 0,
			v: 0,
			t: 1
		});
	}

	calcNextRow = (x, y, lastRow) => {
		let q = this.calcQ(x, y);
		let r = this.calcR(x, y);
		let u, s, v, t;

		u = lastRow.s;
		s = lastRow.u - (lastRow.q * lastRow.s);
		v = lastRow.t;
		t = lastRow.v - (lastRow.q * lastRow.t);

		return ({
			first: false,
			x: x,
			y: y,
			q: q,
			r: r,
			u: u,
			s: s,
			v: v,
			t: t
		});
	}

	calcQ = (x, y) => {
		return parseInt(x / y, 10);
	}

	calcR = (x, y) => {
		return x % y;
	}

	render() {
		let additionalRows = [];

		let rowNodes = [];
		let messages = [];

		let x = this.state.x;
		let y = this.state.y;

		if (y >= x) {
			messages.push(<div className="message">x should be bigger than y.</div>)
		}

		let initRow = this.getInitialRow(x, y);

		let actualRow = initRow;

		while (actualRow.y !== 1 && actualRow.y !== 0) {
			actualRow = this.calcNextRow(actualRow.y, actualRow.r, actualRow);
			additionalRows.push(actualRow);
		}

		rowNodes.push(
			<EuklidRow
				x={initRow.x} y={initRow.y} q={initRow.q} r={initRow.r}
				u={initRow.u} s={initRow.s} v={initRow.v} t={initRow.t}
				onChangeX={this.handleChangeX}
				onChangeY={this.handleChangeY}
				first></EuklidRow>
		);

		for (var i = 0; i < additionalRows.length; i++) {
			var row = additionalRows[i];
			rowNodes.push(
				<EuklidRow
					x={row.x} y={row.y} q={row.q} r={row.r}
					u={row.u} s={row.s} v={row.v} t={row.t}
					></EuklidRow>
			);
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>Euklidischer Algorithmus</h2>
				</div>
				<p className="App-intro">
					To get started, edit the two numbers below:
        		</p>
				<div className="container">
					{rowNodes}
					{messages}
				</div>
			</div>
		);
	}
}

export default App;
