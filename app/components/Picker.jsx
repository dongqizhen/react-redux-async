import React from 'react';
import PropTypes from 'prop-types';

class Picker extends React.Component {
	constructor() {
		super();
		//this.state = { someKey: 'someValue' };
	}

	render() {
		const { options, value, onChange } = this.props;

		return (
			<span>
				<h1>{value}</h1>
				<select name="" id="" onChange={(e) => onChange(e.target.value)} value={value}>
					{options.map((option) => {
						return (
							<option value={option} key={option}>
								{option}
							</option>
						);
					})}
				</select>
			</span>
		);
	}

	componentDidMount() {
		//this.setState({ someKey: 'otherValue' });
	}
}

Picker.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default Picker;
