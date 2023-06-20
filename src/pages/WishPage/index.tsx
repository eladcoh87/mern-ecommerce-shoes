import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { Container } from '@mui/material';

import './style.scss';
import { ecomShoesSelector, EcomShoesActions } from 'actions/ecomShoes';
import {
	AddToCartProductFunction,
	CartProduct,
	DeleteProductWishSagaActionFunction,
	GetWishListProductsSagaFunction,
	LoginUserData,
	Product,
} from 'actions/ecomShoes/interface';
import { Dispatch } from 'redux';
import ProductCard from 'common-components/business/ProductCard';

// import { WishPageActions, wishPageSelector } from 'actions/redux/wishPage';

export type Props = {};

export interface OwnProps extends Props, LocalizeContextProps {
	wishList: Product[];
	userData: LoginUserData;
	getWishListProductsSaga: typeof GetWishListProductsSagaFunction;
	deleteProductWishSaga: typeof DeleteProductWishSagaActionFunction;
	addToCart: typeof AddToCartProductFunction;
	loginUserData: LoginUserData;
}

export class WishPage extends React.Component<OwnProps> {
	componentDidMount(): void {
		const { userData, getWishListProductsSaga, wishList } = this.props;
		if (userData.isLoggedIn && wishList.length === 0) {
			getWishListProductsSaga(userData.token);
		}
	}

	addtoWishList(productId: string) {}
	removeFromWishList(productId: string) {
		const { loginUserData, deleteProductWishSaga } = this.props;
		const data = { productId, token: loginUserData.token };
		deleteProductWishSaga(data);
	}

	render() {
		const { wishList, addToCart } = this.props;
		return (
			<Container maxWidth="xl" className="wish-list-container">
				<div className="headeline-wraper">
					<h3>WISH LIST</h3>
					<hr />
				</div>

				<div className="list-wraper">
					{wishList.length === 0 ? (
						<div className="wish-list-empty">
							<p>WISH LIST IS EMPTY</p>
						</div>
					) : (
						wishList.map((productItem) => (
							<ProductCard
								removeFromWishList={(productId) => this.removeFromWishList(productId)}
								addtoWish={(productId) => this.addtoWishList(productId)}
								addToCartFun={(product) => addToCart(product)}
								key={productItem.id}
								product={productItem}
								existInWish
							/>
						))
					)}
				</div>
			</Container>
		);
	}
}

export default baseConnect<any, any, Props>(
	WishPage,
	(state: ApplicationState) => ({
		wishList: ecomShoesSelector.wishList(state),
		userData: ecomShoesSelector.loginUserData(state),
		loginUserData: ecomShoesSelector.loginUserData(state),
	}),
	(dispatch: Dispatch) => ({
		getWishListProductsSaga: (token: string) => dispatch(EcomShoesActions.getWishListProductsSaga(token)),
		addToCart: (product: CartProduct) => dispatch(EcomShoesActions.addToCartProduct(product)),
		deleteProductWishSaga: (data: { productId: string; token: string }) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			dispatch(EcomShoesActions.deleteProductWishSaga(data)),
	})
);
