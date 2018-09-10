import React from "react";
import styled from "styled-components";

import RequiredStar from "./RequiredStar";
import InputError from "./InputError";

const Container = styled.div`
	margin-bottom: 1em;
`;

const Input = styled.input`
	display: block;
	padding: 0.3em 0.6em;
`;

const TextInput = ({ label, required, type, input, meta }) => (
	<Container>
		<label htmlFor={input.name}>{label}</label>
		{required && <RequiredStar />}
		<Input id={input.name} type={type || "text"} {...input} />
		{meta.error && meta.touched && <InputError>{meta.error}</InputError>}
	</Container>
);

export default TextInput;
