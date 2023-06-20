import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { InjectedFormProps, Form, getFormValues, ConfigProps } from 'redux-form';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { FieldInput } from 'common-components/controllers';
import { email, required } from 'utils/validations';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Person2Icon from '@mui/icons-material/Person2';
import { EcomShoesActions, ecomShoesSelector } from 'actions/ecomShoes';
import { Dispatch } from 'redux';

import './style.scss';
import { LoginUserData, LoginUserSagaFunction } from 'actions/ecomShoes/interface';
import { history } from '@base/features';
import { withToast, ToasterManager } from '@base/features/base-decorator';
import Alert from '@mui/material/Alert';

// import { RegisterUserActions, registerUserSelector } from 'actions/redux/registerUser';

export type Props = {} & ConfigProps;

interface State {
	formError: boolean;
}
type FormValues = {
	email: string;
	password: string;
};

export interface OwnProps extends Props, ToasterManager, LocalizeContextProps {
	formValues: (formName: string) => FormValues;
	loginUserSaga: typeof LoginUserSagaFunction;
	loginUserData: LoginUserData;
	loginUserError: string;
}

@withToast
export class LoginUser extends React.Component<OwnProps & InjectedFormProps, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			formError: false,
		};
	}
	componentDidMount(): void {
		const { loginUserData, toastManager } = this.props;

		if (loginUserData.isLoggedIn) {
			toastManager.add('you are alredy sign-in', {
				appearance: 'error',
				autoDismiss: true,
			});
			history.push('/all-products');
		}
	}

	render() {
		const { handleSubmit, valid, loginUserError } = this.props;

		const { formError } = this.state;

		return (
			<Container maxWidth="xl" className="form-register-container">
				<div className="hedline-wraper">
					<h2>Login</h2>
				</div>
				<div className="personal-wraper">
					<p>fill the required data to login</p>
					{loginUserError && (
						<h1>
							{<Alert severity="error">{loginUserError}</Alert>} <br />{' '}
						</h1>
					)}
					<hr />
				</div>
				<Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
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
							{!valid ? <p className="fill-info-para">please fill all info</p> : <p>Login</p>}
						</Button>
						{formError && <p className="error-para-submit">please fill all the nessecery info</p>}
					</div>
				</Form>
			</Container>
		);
	}

	handleSubmit(formValues: FormValues) {
		const { loginUserSaga } = this.props;

		if (!formValues) {
			this.setState({ formError: true });
		}
		const user = { email: formValues.email, password: formValues.password };
		loginUserSaga(user);
	}
}

export default baseConnectForm<any, any, Props>(
	LoginUser,
	(state: ApplicationState) => {
		return {
			formValues: (formName: string) => getFormValues(formName)(state),
			loginUserData: ecomShoesSelector.loginUserData(state),
			loginUserError: ecomShoesSelector.loginUserError(state),
		};
	},
	(dispatch: Dispatch) => ({
		loginUserSaga: (user: { email: string; password: string }) => dispatch(EcomShoesActions.loginUserSaga(user)),
	}),
	{}
);
