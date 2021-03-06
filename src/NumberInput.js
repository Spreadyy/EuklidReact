import React from 'react';

class NumberInput extends React.Component {
	handleChange = (e) => {
		const {value} = e.target;
		let numberValue = parseInt(value, 10);
		
		if (isNaN(numberValue))
			return;
		
		const max = Math.pow(2,32) - 1;
		if (numberValue > max)
			numberValue = max;

		this.props.onChange(numberValue);

	}

	render() {
		const name = this.props.name;
		const value = this.props.value;
		const readonly = this.props.readonly;

		let input = readonly ?
			<input value={value} type="number" readOnly="readonly" /> :
			<input value={value} min="1" type="number" onChange={this.handleChange} />;
		return (
			<div className={name}>{input}</div>);
	}
}

export default NumberInput;