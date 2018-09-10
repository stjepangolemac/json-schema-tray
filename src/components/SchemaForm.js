import React from "react";
import { Form, Field, FormSpy } from "react-final-form";

import TextInput from "./TextInput";
import CheckboxInput from "./CheckboxInput";
import Button from "./Button";

import { isEmpty } from "../util/validators";
import { url } from "../util/api";

class SchemaForm extends React.Component {
	state = { schema: null, data: {} };

	componentMap = {
		text: TextInput,
		number: TextInput,
		string: TextInput,
		boolean: CheckboxInput
	};

	componentDidUpdate(prevProps) {
		const { selected } = this.props;

		if (prevProps.selected !== selected) {
			this.fetchSchema(selected);
			this.fetchData(selected);
		}
	}

	async fetchSchema(selected) {
		const res = await fetch(`${url}/connectors-full/${selected}`);
		const data = await res.json();

		this.setState({ schema: data.schema });
	}

	async fetchData() {
		const { data: currentData } = this.state;

		const res = await fetch(`${url}/data`);
		const data = await res.json();

		this.setState({ data: { ...currentData, ...data } });
	}

	persistData = async (selected, values) => {
		const { data } = this.state;

		return fetch(`${url}/data`, {
			headers: {
				"Content-type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({ ...data, [selected]: values })
		});
	};

	buildField(name, data) {
		const { title, default: defaultValue, ...restData } = data;

		return (
			<Field
				key={name + data.title}
				name={name}
				component={this.componentMap[data.type]}
				label={data.title}
				validate={data.required && isEmpty}
				{...restData}
			/>
		);
	}

	buildFromSchema() {
		const { schema } = this.state;

		if (!schema) return null;

		return Object.keys(schema).map(key => this.buildField(key, schema[key]));
	}

	makeInitalValues() {
		const { selected } = this.props;
		const { schema, data } = this.state;
		const initialValues = {};

		Object.keys(schema).forEach(
			key => (initialValues[key] = schema[key].default)
		);

		return { ...initialValues, ...data[selected] };
	}

	render() {
		const { selected } = this.props;

		if (!selected) return null;

		const { schema } = this.state;

		if (!schema) return "loading";

		return (
			<Form
				onSubmit={console.log}
				initialValues={this.makeInitalValues()}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<FormSpy
							subscription={{ values: true }}
							onChange={({ values }) => this.persistData(selected, values)}
						/>
						{this.buildFromSchema()}
						<Button>Submit</Button>
					</form>
				)}
			/>
		);
	}
}

export default SchemaForm;
