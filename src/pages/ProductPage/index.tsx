/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { ecomShoesSelector, EcomShoesActions } from 'actions/ecomShoes';
import { Dispatch } from 'redux';
import {
	GetSingleProductFunction,
	Product,
	CartProduct,
	AddToCartProductFunction,
	DeleteProductWishSagaActionFunction,
	LoginUserData,
	AddProductWishListSagaFunction,
} from 'actions/ecomShoes/interface';
import { Container } from '@mui/material';

import './style.scss';
import { Spinner } from 'common-components/business';
import SizeBox from 'common-components/business/SizeBox';
import ProductPageTabs from 'common-components/business/ProductPageTabs';
import ProductCard from 'common-components/business/ProductCard';
import { withToast, ToasterManager } from '@base/features/base-decorator';

// import { ProductPageActions, productPageSelector } from 'actions/redux/productPage';

export type Props = {};

interface State {
	exsistInList: boolean | null;
}
export interface OwnProps extends Props, ToasterManager, LocalizeContextProps {
	getSingleProduct: typeof GetSingleProductFunction;
	addToCartProduct: typeof AddToCartProductFunction;
	deleteProductWishSaga: typeof DeleteProductWishSagaActionFunction;
	addProductWishListSaga: typeof AddProductWishListSagaFunction;
	loginUserData: LoginUserData;
	productsList: Product[];
	product: Product;
	wishList: Product[];
}

@withToast
export class ProductPage extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			exsistInList: null,
		};
	}
	componentDidMount(): void {
		const { getSingleProduct, wishList } = this.props;
		const productId = window.location.href.split('/')[4];
		getSingleProduct(productId);

		if (wishList.some((productItem) => productItem.id === productId)) {
			this.setState({ exsistInList: true });
		} else {
			this.setState({ exsistInList: false });
		}
	}

	stockCount() {
		const { product } = this.props;
		const inStock = product.sizeInStock.some((stock) => stock.stockCount > 0);
		return inStock;
	}
	AddToCart(cartProductItem: CartProduct) {
		const { addToCartProduct } = this.props;
		addToCartProduct(cartProductItem);
	}
	addtoWishList(productId: string) {
		const { loginUserData, addProductWishListSaga, toastManager } = this.props;

		if (!loginUserData.isLoggedIn) {
			return toastManager.add('please sign in to add product to wish list', {
				appearance: 'error',
				autoDismiss: true,
			});
		}
		const data = { productId, token: loginUserData.token };
		addProductWishListSaga(data);
		this.setState({ exsistInList: true });

		return toastManager.add('product add to the wish list ', {
			appearance: 'success',
			autoDismiss: true,
		});
	}
	removeFromWishList(productId: string) {
		const { loginUserData, deleteProductWishSaga } = this.props;
		const data = { productId, token: loginUserData.token };
		deleteProductWishSaga(data);
		this.setState({ exsistInList: false });
	}

	render() {
		const { product, productsList, wishList } = this.props;
		const { exsistInList } = this.state;
		const newList = [...productsList.slice(0, 10)];
		if (!product) {
			return (
				<div style={{ textAlign: 'center', paddingTop: '300px' }}>
					<div>
						{' '}
						<Spinner />
					</div>{' '}
				</div>
			);
		}
		return (
			<Container maxWidth="xl" className="productPage-container">
				<div className="main-product-wraper">
					<div className="main-product-image">
						<img
							src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
							alt=""
						/>
					</div>
					<div className="main-product-description">
						<h2>{product.name}</h2>
						<p className="product-data-para">
							Brand: <span className="product-data"> {product.company} </span>
						</p>
						<p className="product-data-para">
							Avaliblilty: <span className="product-data">{this.stockCount() && 'In Stock'}</span>{' '}
						</p>
						<p className="product-data-para">
							Sku: <span className="product-data">{product._id}</span>{' '}
						</p>
						<p className="product-data-para-price">${product.price}.00</p>
						<hr />
						<p className="product-data-para-desc">{product.description}</p>
						<div className="size-and-colors-box">
							<SizeBox
								AddToCart={(cartProductItem: CartProduct) => this.AddToCart(cartProductItem)}
								addtoWishList={(productId: string) => this.addtoWishList(productId)}
								removeFromWishList={(productId: string) => this.removeFromWishList(productId)}
								existInWish={exsistInList}
								productId={product._id || '1'}
								price={product.price}
								image={product.image}
								date={product.date}
								name={product.name}
							/>
						</div>
					</div>
				</div>
				<ProductPageTabs />
				<div className="realted-products-container">
					<div className="headline">
						<h2>Related Products</h2>
						<div className="headline-line" />
					</div>
					<div className="product-card-container">
						{newList.map((productListItem) => (
							<div className="product-wraper" key={productListItem.id}>
								<ProductCard
									removeFromWishList={(productId) => this.removeFromWishList(productId)}
									addtoWish={(productId) => this.addtoWishList(productId)}
									addToCartFun={(productItem) => this.AddToCart(productItem)}
									product={productListItem as typeof product}
									existInWish={wishList.some((productItem) => productItem.id === product.id)}
								/>
							</div>
						))}
					</div>
				</div>
			</Container>
		);
	}
}

export default baseConnect<any, any, Props>(
	ProductPage,
	(state: ApplicationState) => ({
		product: ecomShoesSelector.singleProduct(state),
		productsList: ecomShoesSelector.InitProductsList(state),
		wishList: ecomShoesSelector.wishList(state),
		loginUserData: ecomShoesSelector.loginUserData(state),
	}),
	(dispatch: Dispatch) => ({
		getSingleProduct: (productId: string) => dispatch(EcomShoesActions.getSingleProduct(productId)),
		addToCartProduct: (product: CartProduct) => dispatch(EcomShoesActions.addToCartProduct(product)),
		addProductWishListSaga: (data: { productId: string; token: string }) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			dispatch(EcomShoesActions.addProductWishListSaga(data)),
		deleteProductWishSaga: (data: { productId: string; token: string }) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			dispatch(EcomShoesActions.deleteProductWishSaga(data)),
	})
);
