import React from "react";
import styled from 'styled-components'

import RequiredStar from "./RequiredStar";
import InputError from "./InputError";

const Container = styled.div`
	padding-bottom: 1em;
`

const CheckboxInput = ({ label, required, input, meta }) => (
	<Container>
		<label htmlFor={input.name}>{label}</label>
		{required && <RequiredStar />}
		<input type="checkbox" {...input} />
		{meta.error && meta.touched && <InputError>{meta.error}</InputError>}
	</Container>
);

export default CheckboxInput;
