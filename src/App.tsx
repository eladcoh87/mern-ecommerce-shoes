import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { PendingTasks } from '@base/features/base-global-spinner/reducer';
import { Media } from '@base/features/base-render-mobile';
import ErrorHandler from 'containers/ErrorHandler';
import { ApplicationState } from 'actions';
import { Spinner } from 'common-components/business';
import HeaderSection from 'containers/HeaderSection';
import Footer from 'common-components/business/Footer';
import { Dispatch } from 'redux';
import { EcomShoesActions } from 'actions/ecomShoes';
import { LoginUserData, SetUserDetailsLocalstorageFunction } from 'actions/ecomShoes/interface';

interface Props {
	children: any;
	pendingTasks: PendingTasks;
	setUserDetailsLocalstorage: typeof SetUserDetailsLocalstorageFunction;
}

class App extends React.Component<Props> {
	componentDidMount(): void {
		const { setUserDetailsLocalstorage } = this.props;
		const userDetailes = JSON.parse(window.localStorage.getItem('userData') || '{}');
		console.log(userDetailes);

		if (userDetailes.isLoggedIn) {
			console.log(userDetailes);
			setUserDetailsLocalstorage(userDetailes);
		}
	}
	render() {
		const { children, pendingTasks } = this.props;
		const loading = pendingTasks?.length;

		return (
			<>
				<ErrorHandler />
				{!!loading && <Spinner />}
				<HeaderSection />
				<Media greaterThan="sm">{children}</Media>
				<Footer />
			</>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => ({
	pendingTasks: state.globalSpinner.pendingTasks,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	setUserDetailsLocalstorage: (userDetail: LoginUserData) =>
		dispatch(EcomShoesActions.setUserDetailsLocalstorage(userDetail)),
});

export default baseConnect(App, mapStateToProps, mapDispatchToProps);
