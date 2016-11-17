import React from 'react';
import './App.css';
import { getRows } from './EuklidCalc';
import { Link } from 'react-router';

class CalcMaxRows extends React.Component {
	constructor(props) {
		super(props);
		this.state = { max: 1 };
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
		for (let y = 1; y <= max; y++) {
			for (var x = (y+1); x <= max; x++) {
				let rows = getRows(x, y);
				data.push(rows.length);
			}
		}
		this.setState({ data: data });
		console.log(data)
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
					<input type="number" min="1" value={this.state.max} onChange={this.handleChange} />
					<button type="button" onClick={this.run}>Start</button>
					<div className="data">
						{this.state.data}
					</div>
				</div>
			</div>
		);
	}
}
export default CalcMaxRows;