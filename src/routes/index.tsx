/* eslint-disable react/jsx-wrap-multilines */
import * as React from 'react';
import { Switch } from 'react-router-dom';
import FlowManagerConfig from 'public/config/flow-manager/types.json';
import Route from './PageContainer';

/* -------------- Pages --------------- */
import App from '../App';
import ErrorPage from 'pages/ErrorPage';
import Checkout from 'pages/Checkout';
import FormExample from 'pages/FormExample';
import ProtectedRoute from 'containers/ProtectedRoute';

/* -------------- Routes Paths --------------- */
import RoutesPath from './RoutesPath';
import HomePage from 'pages/HomePage';
import AllProducts from 'pages/AllProducts';
import ProductPage from 'pages/ProductPage';
import RegisterUser from 'pages/RegisterUser';
import LoginUser from 'pages/LoginUser';
import WishPage from 'pages/WishPage';
import CartPage from 'pages/CartPage';
import CheckOutForm from 'pages/CheckOutForm';
import ThankYouPage from 'pages/ThankYouPage';

const { stepTypes } = FlowManagerConfig;

export default (
	<>
		<App>
			<Switch>
				<Route exact path={RoutesPath.CHECKOUT} step={stepTypes.CHECKOUT.name} component={Checkout} />
				<Route exact path={RoutesPath.FORM_EXAMPLE} component={() => <FormExample form="FormExample" />} />
				<Route
					exact
					path={RoutesPath.CHECKOUT_SAMSUNG}
					step={stepTypes.CHECKOUT_SAMSUNG.name}
					component={() => <h1>Checkout for Samsung</h1>}
				/>
				<Route exact path={RoutesPath.LOGIN_USER} component={() => <LoginUser form="LoginUser" />} />
				<Route exact path={RoutesPath.REGISTER_USER} component={() => <RegisterUser form="RegisterUser" />} />
				<Route
					exact
					path={RoutesPath.ProductPage}
					step={stepTypes.CHECKOUT_XIAOMI.name}
					component={ProductPage}
				/>
				<Route exact path={RoutesPath.CART_PAGE} step={stepTypes.CHECKOUT_XIAOMI.name} component={CartPage} />

				<Route
					exact
					path={RoutesPath.ALL_PRODUCTS}
					step={stepTypes.CHECKOUT_XIAOMI.name}
					component={AllProducts}
				/>
				<Route
					exact
					path={RoutesPath.THANK_YOU}
					step={stepTypes.CHECKOUT_XIAOMI.name}
					component={ThankYouPage}
				/>
				<Route
					exact
					path={RoutesPath.ECOM_CHECKOUT}
					step={stepTypes.CHECKOUT_XIAOMI.name}
					component={() => <CheckOutForm form="CheckOutForm" />}
				/>
				

				<Route
					exact
					path={RoutesPath.WISH}
					step={stepTypes.CHECKOUT_XIAOMI.name}
					component={() => (
						<ProtectedRoute>
							{' '}
							<WishPage />{' '}
						</ProtectedRoute>
					)}
				/>
				<Route exact path={RoutesPath.ERROR_PAGE} component={() => <ErrorPage />} />
				<Route path={RoutesPath.ROOT} step={stepTypes.DEVICE_GALLERY.name} component={HomePage} />
			</Switch>
		</App>
	</>
);
