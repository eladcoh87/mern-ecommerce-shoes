/* eslint-disable harmony-boilerplate/no-component-did-update */
import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { InjectedFormProps, Form, getFormValues, ConfigProps } from 'redux-form';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { FieldInput } from 'common-components/controllers';
import { alphaNumeric, email, maxLength, required } from 'utils/validations';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Person2Icon from '@mui/icons-material/Person2';
import { EcomShoesActions, ecomShoesSelector } from 'actions/ecomShoes';
import { Dispatch } from 'redux';

import './style.scss';
import DialogRegister from 'common-components/business/DialogRegister';
import { NewUser, RegisterNewUserSagaFunction } from 'actions/ecomShoes/interface';

// import { RegisterUserActions, registerUserSelector } from 'actions/redux/registerUser';

export type Props = {} & ConfigProps;

interface State {
	formError: boolean;
	openDialod: boolean;
}
type FormValues = {
	username: string;
	email: string;
	password: string;
};

export interface OwnProps extends Props, LocalizeContextProps {
	formValues: (formName: string) => FormValues;
	registerNewUser: typeof RegisterNewUserSagaFunction;
	registerUserStatus: { error: boolean; success: boolean; message: string };
}

export class RegisterUser extends React.Component<OwnProps & InjectedFormProps, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			formError: false,
			openDialod: false,
		};
	}

	componentDidUpdate(
		prevProps: Readonly<OwnProps & InjectedFormProps<{}, {}, string>>,
		prevState: Readonly<State>,
		snapshot?: any
	): void {
		const { registerUserStatus } = this.props;
		const { success } = registerUserStatus;
		const { registerUserStatus: prevRegisterUserStatus } = prevProps;
		const { success: prevSucces } = prevRegisterUserStatus;

		if (prevSucces !== success) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ openDialod: true });
		}
	}
	render() {
		const { handleSubmit, valid, registerUserStatus } = this.props;
		const { formError, openDialod } = this.state;
		const { error, message } = registerUserStatus;

		return (
			<Container maxWidth="xl" className="form-register-container">
				<DialogRegister onCloseFunc={() => this.setState({ openDialod: false })} isOpend={openDialod} />
				{error && message}
				<div className="hedline-wraper">
					<h2>Create Account</h2>
				</div>
				<div className="personal-wraper">
					<p>Your Personal Details</p>
					<hr />
				</div>
				<Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
					<div className="text-filed-box">
						<p>User name: </p>
						<div className="text-filed-wraper">
							<FieldInput
								fullWidth
								name="username"
								type="text"
								placeholder="Username"
								validate={[required, maxLength]}
								warn={alphaNumeric}
							/>
						</div>
					</div>

					<div className="text-filed-box">
						<p>Email: </p>
						<div className="text-filed-wraper">
							<FieldInput
								fullWidth
								name="email"
								type="email"
								placeholder="Email"
								validate={[required, email]}
							/>
						</div>
					</div>
					<div className="text-filed-box">
						<p>Password: </p>
						<div className="text-filed-wraper">
							<FieldInput
								fullWidth
								name="password"
								type="password"
								placeholder="Password"
								validate={[required]}
							/>
						</div>
					</div>
					<div className="register-btn-wraper">
						<Button
							disabled={!valid}
							type="submit"
							variant="contained"
							startIcon={<Person2Icon fontSize="small" />}
						>
							{!valid ? <p className="fill-info-para">please fill all info</p> : <p>create</p>}
						</Button>
						{formError && <p className="error-para-submit">please fill all the nessecery info</p>}
					</div>
				</Form>
			</Container>
		);
	}

	handleSubmit(formValues: FormValues) {
		const { registerNewUser } = this.props;

		// eslint-disable-next-line react/jsx-indent

		if (!formValues) {
			this.setState({ formError: true });
			return;
		}

		const user = {
			name: formValues.username,
			password: formValues.password,
			email: formValues.email,
		};

		registerNewUser(user);
	}
}

export default baseConnectForm<any, any, Props>(
	RegisterUser,
	(state: ApplicationState) => {
		return {
			formValues: (formName: string) => getFormValues(formName)(state),
			registerUserStatus: ecomShoesSelector.registerNewUserStatus(state),
		};
	},
	(dispatch: Dispatch) => ({
		registerNewUser: (user: NewUser) => dispatch(EcomShoesActions.registerNewUserSaga(user)),
	}),
	{}
);
