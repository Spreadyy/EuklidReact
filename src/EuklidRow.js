import React from 'react';
import NumberInput from './NumberInput';
import './EuklidRow.css';

class EuklidRow extends React.Component {
	handleChangeX = (value) => {
		this.props.onChangeX(value);
	}

	handleChangeY = (value) => {
		this.props.onChangeY(value);
	}

	render() {
		let numberInputs = [];

		if (this.props.first) {
			numberInputs.push(
				<NumberInput value={this.props.x} onChange={this.handleChangeX}></NumberInput>,
				<NumberInput value={this.props.y} onChange={this.handleChangeY}></NumberInput>
			);
		} else {
			numberInputs.push(
				<NumberInput value={this.props.x} readonly></NumberInput>,
				<NumberInput value={this.props.y} readonly></NumberInput>
			);
		}

		numberInputs.push(
			<NumberInput value={this.props.q} readonly></NumberInput>,
			<NumberInput value={this.props.r} readonly></NumberInput>,
			<NumberInput value={this.props.u} readonly></NumberInput>,
			<NumberInput value={this.props.s} readonly></NumberInput>,
			<NumberInput value={this.props.v} readonly></NumberInput>,
			<NumberInput value={this.props.t} readonly></NumberInput>
		);

		return (
			<div className="euklidRow">
				{numberInputs}
			</div>
		);
	}
}

export default EuklidRow;