import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { PendingTasks } from '@base/features/base-global-spinner/reducer';
// import { Media } from '@base/features/base-render-mobile';
import ErrorHandler from 'containers/ErrorHandler';
import { ApplicationState } from 'actions';
import { Spinner } from 'common-components/business';
import HeaderSection from 'containers/HeaderSection';
import Footer from 'common-components/business/Footer';
import { Dispatch } from 'redux';
import { ecomShoesSelector, EcomShoesActions } from 'actions/ecomShoes';
import {
	GetInitProductsSagaFunction,
	GetWishListProductsSagaFunction,
	LoginUserData,
	Product,
} from 'actions/ecomShoes/interface';

interface Props {
	children: any;
	wishList: Product[];
	pendingTasks: PendingTasks;
	loginUserData: LoginUserData;
	getProductsSaga: typeof GetInitProductsSagaFunction;
	getWishListProductsSaga: typeof GetWishListProductsSagaFunction;
}

class App extends React.Component<Props> {
	componentDidMount(): void {
		const { getProductsSaga, getWishListProductsSaga, loginUserData, wishList } = this.props;
		getProductsSaga();
		if (loginUserData.isLoggedIn && wishList.length === 0) {
			getWishListProductsSaga(loginUserData.token);
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
				{children}
				<Footer />
			</>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => ({
	pendingTasks: state.globalSpinner.pendingTasks,
	loginUserData: ecomShoesSelector.loginUserData(state),
	wishList: ecomShoesSelector.wishList(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	getProductsSaga: () => dispatch(EcomShoesActions.getInitProductsSaga()),
	getWishListProductsSaga: (token: string) => dispatch(EcomShoesActions.getWishListProductsSaga(token)),
});

export default baseConnect(App, mapStateToProps, mapDispatchToProps);
