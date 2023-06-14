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
import { EcomShoesActions } from 'actions/ecomShoes';
import {
	CartInfo,
	GetWishListProductsSagaFunction,
	LoginUserData,
	SetCartFromLocalstorageActionFunction,
	SetUserDetailsLocalstorageFunction,
} from 'actions/ecomShoes/interface';

interface Props {
	children: any;
	pendingTasks: PendingTasks;
	setUserDetailsLocalstorage: typeof SetUserDetailsLocalstorageFunction;
	setCartFromLocalstorage: typeof SetCartFromLocalstorageActionFunction;
	getWishListProductsSaga: typeof GetWishListProductsSagaFunction;
}

class App extends React.Component<Props> {
	componentDidMount(): void {
		const { setUserDetailsLocalstorage, setCartFromLocalstorage, getWishListProductsSaga } = this.props;
		const userDetailes = JSON.parse(window.localStorage.getItem('userData') || '{}');

		if (userDetailes.isLoggedIn) {
			setUserDetailsLocalstorage(userDetailes);
			getWishListProductsSaga(userDetailes.token);
		}

		const cart = JSON.parse(window.localStorage.getItem('cart') || '{}');
		const cartTotalQty = JSON.parse(window.localStorage.getItem('cartTotalQty') || '{}');
		const cartTotalPrice = JSON.parse(window.localStorage.getItem('cartTotalPrice') || '{}');
		const cartinfo = {
			cart,
			cartTotalQty,
			cartTotalPrice,
		};
		if (cart.length > 0) {
			setCartFromLocalstorage(cartinfo);
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
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
	setUserDetailsLocalstorage: (userDetail: LoginUserData) =>
		dispatch(EcomShoesActions.setUserDetailsLocalstorage(userDetail)),
	getWishListProductsSaga: (token: string) => dispatch(EcomShoesActions.getWishListProductsSaga(token)),
	setCartFromLocalstorage: (cartInfo: CartInfo) => dispatch(EcomShoesActions.setCartFromLocalstorage(cartInfo)),
});

export default baseConnect(App, mapStateToProps, mapDispatchToProps);
