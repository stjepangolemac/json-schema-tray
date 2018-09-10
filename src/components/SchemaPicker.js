import React from "react";
import styled from "styled-components";

import { url } from "../util/api";

const PickerContainer = styled.div`
	margin-bottom: 2em;
`;

class SchemaPicker extends React.Component {
	state = { connectors: null, selected: null };

	componentDidMount() {
		this.fetchConnectors();
	}

	async fetchConnectors() {
		const res = await fetch(`${url}/connectors`);
		const connectors = await res.json();

		this.setState({ connectors });
	}

	renderCheckboxes() {
		const { connectors, selected } = this.state;

		if (!connectors) {
			return null;
		}

		return connectors.map(({ id, name }) => (
			<div key={id}>
				<label htmlFor={id}>{name}</label>
				<input
					id={id}
					type="radio"
					value={id === selected}
					onChange={() => this.setState({ selected: id })}
					name="connectorPicker"
				/>
			</div>
		));
	}

	render() {
		const { children } = this.props;
		const { selected } = this.state;

		return (
			<React.Fragment>
				<PickerContainer>{this.renderCheckboxes()}</PickerContainer>
				{children && children(selected)}
			</React.Fragment>
		);
	}
}

export default SchemaPicker;
