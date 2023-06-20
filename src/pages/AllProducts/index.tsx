/* eslint-disable no-else-return */
/* eslint-disable operator-linebreak */
/* eslint-disable harmony-boilerplate/no-component-did-update */
import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { Dispatch } from 'redux';
import CheckBoxGroupPrice from 'common-components/business/CheckBoxGroup';
import Container from '@mui/material/Container';
import './style.scss';
import SortBy from 'common-components/business/SortBy';
import { EcomShoesActions, ecomShoesSelector } from 'actions/ecomShoes';
import {
	GetInitProductsSagaFunction,
	Product,
	CartProduct,
	AddToCartProductFunction,
	LoginUserData,
	AddProductWishListSagaFunction,
	DeleteProductWishSagaActionFunction,
} from 'actions/ecomShoes/interface';
import ProductCard from 'common-components/business/ProductCard';
import CheckBoxGroupCompany from 'common-components/business/CheckBoxGroupCompany';
import CheckBoxGroupCategories from 'common-components/business/CheckBoxGroupCategories';
import CheckBoxGroupColor from 'common-components/business/CheckBoxGroupColor';
import Breadcrumbs from 'common-components/business/Breadcrumbs';
import { withToast, ToasterManager } from '@base/features/base-decorator';

// import { AllProductsActions, allProductsSelector } from 'actions/redux/allProducts';

export type Props = {};

interface State {
	filterPrice: string[];
	filterBrand: string[];
	filterCategories: string[];
	filterColors: string[];
	sortMethod: string;
}

export interface OwnProps extends Props, ToasterManager, LocalizeContextProps {
	getProductsSaga: typeof GetInitProductsSagaFunction;
	addToCart: typeof AddToCartProductFunction;
	productsListFilter: Product[];
	loginUserData: LoginUserData;
	addProductWishListSaga: typeof AddProductWishListSagaFunction;
	deleteProductWishSaga: typeof DeleteProductWishSagaActionFunction;
	wishList: Product[];
}

@withToast
export class AllProducts extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);
		this.state = {
			filterPrice: [],
			filterBrand: [],
			filterCategories: [],
			filterColors: [],
			sortMethod: 'Alphabet_a_to_z',
		};
	}

	componentDidMount(): void {
		const { getProductsSaga } = this.props;
		getProductsSaga();
	}

	onPriceChange(price: string) {
		const { filterPrice } = this.state;

		if (filterPrice.includes(price)) {
			filterPrice.filter((p) => p !== price);

			this.setState((prevState) => {
				return { filterPrice: prevState.filterPrice.filter((p) => p !== price) };
			});
		} else {
			this.setState((prevState) => {
				return { filterPrice: [...prevState.filterPrice, price] };
			});
		}
	}

	onBrandChange(brand: string) {
		const { filterBrand } = this.state;

		if (filterBrand.includes(brand)) {
			filterBrand.filter((b) => b !== brand);

			this.setState((prevState) => {
				return { filterBrand: prevState.filterBrand.filter((b) => b !== brand) };
			});
		} else {
			this.setState((prevState) => {
				return { filterBrand: [...prevState.filterBrand, brand] };
			});
		}
	}
	onCategoriesChange(category: string) {
		const { filterCategories } = this.state;

		if (filterCategories.includes(category)) {
			filterCategories.filter((c) => c !== category);

			this.setState((prevState) => {
				return { filterCategories: prevState.filterCategories.filter((c) => c !== category) };
			});
		} else {
			this.setState((prevState) => {
				return { filterCategories: [...prevState.filterCategories, category] };
			});
		}
	}
	onColorsChange(color: string) {
		const { filterColors } = this.state;
		if (filterColors.includes(color)) {
			filterColors.filter((c) => c !== color);

			this.setState((prevState) => {
				return { filterColors: prevState.filterColors.filter((c) => c !== color) };
			});
		} else {
			this.setState((prevState) => {
				return { filterColors: [...prevState.filterColors, color] };
			});
		}
	}

	getPriceRange(price: number) {
		if (price >= 0 && price <= 300) {
			return '0-300';
		}
		if (price > 300 && price <= 450) {
			return '300-450';
		}
		if (price > 450 && price <= 3500) {
			return '450-3500';
		}
		return '';
	}
	filterAllProdcutFunc() {
		const { productsListFilter } = this.props;
		const { filterPrice, filterBrand, filterCategories, filterColors } = this.state;
		const newFilteredList = productsListFilter.filter((shoe) => {
			if (
				filterPrice.length > 0 &&
				filterBrand.length > 0 &&
				filterCategories.length > 0 &&
				filterColors.length > 0
			) {
				return (
					filterBrand.some((brand) => shoe.company.includes(brand)) &&
					filterPrice.some((price) => price === this.getPriceRange(shoe.price)) &&
					filterCategories.some((category) => shoe.categories.includes(category)) &&
					filterColors.some((color) => shoe.colors.includes(color))
				);
			} else if (filterPrice.length > 0 && filterBrand.length > 0) {
				return (
					filterPrice.some((price) => price === this.getPriceRange(shoe.price)) &&
					filterBrand.some((brand) => shoe.company.includes(brand))
				);
			} else if (filterPrice.length > 0 && filterCategories.length > 0) {
				return (
					filterPrice.some((price) => price === this.getPriceRange(shoe.price)) &&
					filterCategories.some((category) => shoe.categories.includes(category))
				);
			} else if (filterBrand.length > 0 && filterCategories.length > 0) {
				return (
					filterBrand.some((brand) => shoe.company.includes(brand)) &&
					filterCategories.some((category) => shoe.categories.includes(category))
				);
			} else if (filterColors.length > 0 && filterPrice.length > 0) {
				return (
					filterColors.some((color) => shoe.colors.includes(color)) &&
					filterPrice.some((price) => price === this.getPriceRange(shoe.price))
				);
			} else if (filterColors.length > 0 && filterBrand.length > 0) {
				return (
					filterColors.some((color) => shoe.colors.includes(color)) &&
					filterBrand.some((brand) => shoe.company.includes(brand))
				);
			} else if (filterColors.length > 0 && filterCategories.length > 0) {
				return (
					filterColors.some((color) => shoe.colors.includes(color)) &&
					filterCategories.some((category) => shoe.categories.includes(category))
				);
			} else if (filterPrice.length > 0) {
				return filterPrice.some((price) => price === this.getPriceRange(shoe.price));
			} else if (filterBrand.length > 0) {
				return filterBrand.some((brand) => shoe.company.includes(brand));
			} else if (filterCategories.length > 0) {
				return filterCategories.some((category) => shoe.categories.includes(category));
			} else if (filterColors.length > 0) {
				return filterColors.some((color) => shoe.colors.includes(color));
			}
			return true;
		});

		return newFilteredList;
	}

	onSortChange(sortBy: string) {
		this.setState((prevState) => {
			return { sortMethod: sortBy };
		});
	}

	sortAllProducts(a: Product, b: Product): number {
		const { sortMethod } = this.state;

		switch (sortMethod) {
			case 'Alphabet_a_to_z':
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return -1;
				}
				if (a.name.toLowerCase() > b.name.toLowerCase()) {
					return 1;
				}
				return 0;

			case 'Alphabet_z_to_a':
				if (a.name.toLowerCase() > b.name.toLowerCase()) {
					return -1;
				}
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return 1;
				}
				return 0;

			case 'Price_low_to_high':
				return a.price - b.price;

			case 'Price_high_to_low':
				return b.price - a.price;

			case 'Date_old_to_new':
				return +new Date(a.date) - +new Date(b.date);
			case 'Date_new_to_old':
				return +new Date(b.date) - +new Date(a.date);
			default:
				break;
		}

		return 1;
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
		return addProductWishListSaga(data);
	}

	addToCartHandle(productItem: CartProduct) {
		const { addToCart, toastManager } = this.props;

		toastManager.add(`${productItem.name} add to the cart`, {
			appearance: 'success',
			autoDismiss: true,
		});
		addToCart(productItem);
	}

	removeFromWishList(productId: string) {
		const { loginUserData, deleteProductWishSaga } = this.props;
		const data = { productId, token: loginUserData.token };
		deleteProductWishSaga(data);
	}

	render() {
		const { wishList } = this.props;
		return (
			<Container className="all-products-filters-container" maxWidth="xl">
				<Breadcrumbs pathName="All-Products" />
				<div className="all-products-filters-wraper">
					<div className="left-side-filter-container">
						<CheckBoxGroupPrice onPriceChange={(price) => this.onPriceChange(price)} />
						<CheckBoxGroupCompany onBrandChange={(brand) => this.onBrandChange(brand)} />
						<CheckBoxGroupCategories onCategoriesChange={(category) => this.onCategoriesChange(category)} />
						<CheckBoxGroupColor onColorsChange={(color) => this.onColorsChange(color)} />
					</div>

					<div className="right-side-filter-container">
						<h1>PRODUCTS</h1>
						<div className="sort-container">
							<SortBy onSortChange={(sortBy) => this.onSortChange(sortBy)} />
						</div>
						<div className="product-card-filter-container">
							{this.filterAllProdcutFunc()
								.sort((a: Product, b: Product) => this.sortAllProducts(a, b))
								.map((product) => (
									<ProductCard
										addtoWish={(productId) => this.addtoWishList(productId)}
										addToCartFun={(productItem) => this.addToCartHandle(productItem)}
										removeFromWishList={(productId) => this.removeFromWishList(productId)}
										key={product.id}
										product={product}
										existInWish={wishList.some((productItem) => productItem.id === product.id)}
									/>
								))}
							{this.filterAllProdcutFunc().length === 0 && <p>cant find any match products </p>}
						</div>
					</div>
				</div>
			</Container>
		);
	}
}

export default baseConnect<any, any, Props>(
	AllProducts,
	(state: ApplicationState) => ({
		productsListFilter: ecomShoesSelector.productsListFilter(state),
		loginUserData: ecomShoesSelector.loginUserData(state),
		wishList: ecomShoesSelector.wishList(state),
	}),
	(dispatch: Dispatch) => ({
		getProductsSaga: () => dispatch(EcomShoesActions.getInitProductsSaga()),
		addToCart: (product: CartProduct) => dispatch(EcomShoesActions.addToCartProduct(product)),
		addProductWishListSaga: (data: { productId: string; token: string }) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			dispatch(EcomShoesActions.addProductWishListSaga(data)),
		deleteProductWishSaga: (data: { productId: string; token: string }) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			dispatch(EcomShoesActions.deleteProductWishSaga(data)),
	})
);
