import React from 'react';

class NumberInput extends React.Component {
	handleChange = (e) => {
		this.props.onChange(e.target.value);
	}

	render() {
		const name = this.props.name;
		const value = this.props.value;
		const readonly = this.props.readonly;

		let input = readonly ?
			<input value={value} type="number" readOnly="readonly" /> :
			<input value={value} type="number" onChange={this.handleChange} />;
		return (
			<div className={name}>{input}</div>);
	}
}

export default NumberInput;