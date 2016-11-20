import React from 'react';
import './App.css';
import Chart from './Chart';
import { getRows } from './EuklidCalc';
import { Link } from 'react-router';

class CalcMaxRows extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			max: 1
		};
	}

	handleChange = (e) => {
		let numberValue = parseInt(e.target.value, 10);

		if (isNaN(numberValue))
			return;

		if (numberValue > 1000)
			numberValue = 1000;

		this.setState({ max: numberValue });
	}

	run = () => {
		const max = this.state.max;

		let data = [];
		for (let x = 1; x <= max; x++) {
			let xRow = [];
			for (var y = 1; y <= max; y++) {
				let rows = getRows(y, x);
				xRow.push(rows.length);
			}
			data.push(xRow);
		}
		this.setState({ data: data });
	}

	render() {
		return (
			<div>
				<div className="App-header">
					<h2>
						<Link to="/">Euklidischer Algorithmus</Link>
					</h2>
				</div>
				<div className="container">
					<form>
						<input type="number" min="1" value={this.state.max} onChange={this.handleChange} />
						<button type="button" onClick={this.run}>Start</button>
					</form>
				</div>
				<div className="chart">
					<Chart data={this.state.data}></Chart>
				</div>
			</div>
		);
	}
}
export default CalcMaxRows;