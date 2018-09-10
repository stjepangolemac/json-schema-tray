import React, { Component } from "react";
import styled from "styled-components";

import SchemaPicker from "./components/SchemaPicker";
import SchemaForm from "./components/SchemaForm";

const Container = styled.div`
	padding: 2em;
`;

class App extends Component {
	render() {
		return (
			<Container>
				<SchemaPicker>
					{selected => <SchemaForm selected={selected} />}
				</SchemaPicker>
			</Container>
		);
	}
}

export default App;
