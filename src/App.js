import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import { getRows } from './EuklidCalc';
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

	render() {
		let rowNodes = [];
		let messages = [];

		const { x, y } = this.state;

		if (y >= x) {
			messages.push('x should be bigger than y');
		}

		const rows = getRows(x, y);

		const [initRow, ...additionalRows] = rows;
		const lastRow = rows[rows.length - 1];

		messages.push(`(${lastRow.s} × ${initRow.x}) + (${lastRow.t} × ${initRow.y}) = ${lastRow.y} (ggT)`);

		rowNodes.push(
			<EuklidRow
				key="row0"
				{...initRow}
				onChangeX={this.handleChangeX}
				onChangeY={this.handleChangeY}
				first></EuklidRow>
		);

		for (let i = 0; i < additionalRows.length; i++) {
			let row = additionalRows[i];
			let key = 'row' + (i + 1);
			rowNodes.push(
				<EuklidRow
					key={key}
					{...row} />
			);
		}

		let messageNodes = [];
		for (let i = 0; i < messages.length; i++) {
			messageNodes.push(
				<p key={i} className="message">{messages[i]}</p>
			);
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>
						Euklidischer Algorithmus
						<Link className="calcMaxRows" to="/CalcMaxRows">🏆</Link>
					</h2>
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
					{messageNodes}
				</div>
			</div>
		);
	}
}

export default App;
