/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Field, BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { TextFieldProps } from '@mui/material';
import SelectCountry from 'common-components/business/SelectCountry';

export type Props = {} & BaseFieldProps & TextFieldProps;

class FieldInputCountry extends React.Component<Props> {
	renderField(fieldData: WrappedFieldProps) {
		const { input, meta, ...rest } = fieldData;
		// const { touched, error, warning } = meta;
		// const errorMessage = touched ? warning || error : undefined;
		// const errorMessageIS = typeof errorMessage === 'string';

		return <SelectCountry {...input} {...rest} />;
	}

	render() {
		return <Field {...(this.props as BaseFieldProps)} component={this.renderField} />;
	}
}

export default FieldInputCountry;
