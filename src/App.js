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
			x,
			y,
			q,
			r,
			u,
			s,
			v,
			t
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

		const { x, y } = this.state;

		if (y >= x) {
			messages.push(<p className="message">x should be bigger than y.</p>)
		}

		let initRow = this.getInitialRow(x, y);

		let actualRow = initRow;

		while (actualRow.r !== 0) {
			actualRow = this.calcNextRow(actualRow.y, actualRow.r, actualRow);
			additionalRows.push(actualRow);
		}

		messages.push(
			<p className="message">({actualRow.s} × {initRow.x}) + ({actualRow.t} × {initRow.y}) = {actualRow.y} (ggT)</p>
		);

		rowNodes.push(
			<EuklidRow 
				{...initRow}
				onChangeX={this.handleChangeX}
				onChangeY={this.handleChangeY}
				first></EuklidRow>
		);

		for (var i = 0; i < additionalRows.length; i++) {
			var row = additionalRows[i];
			rowNodes.push(
				<EuklidRow {...row}/>
			);
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>Euklidischer Algorithmus</h2>
				</div>
				<div className="container">
					<p className="App-intro">
						To get started, edit the two numbers (x &amp; y) below:
        			</p>
					<div className="rows">
						<div className="rowHeader">
							<div>x</div>
							<div>y</div>
							<div>q</div>
							<div>r</div>
							<div>u</div>
							<div>s</div>
							<div>v</div>
							<div>t</div>
						</div>
						{rowNodes}
					</div>
					{messages}
				</div>
			</div>
		);
	}
}

export default App;
