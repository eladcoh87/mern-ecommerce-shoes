/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';

import {
	EcomShoesState,
	TypesNames,
	ActionCreator,
	SetInitProductsAction,
	ChangeStatusListAction,
	SetSingleProductAction,
	AddToCartProductAction,
	DeleteCartProductAction,
	RegisterNewUserStatusAction,
	LoginUserSetDataAction,
	SetWishListProductsAction,
	AddProductWishAction,
	DeleteProductWishAction,
	SetUserDetailsLocalstorageAction,
	SetCartFromLocalstorageAction,
	LoginUserErrorAction,
} from './interface';
import { changeListStatus } from './manager';

// TODO: Do not for get add your reducer to index file

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getInitProductsSaga: [], // handle by saga - fetch the prodcuts list from backend
	setInitProducts: ['productsList'], // handle by reducer - set the  init products list to state
	changeStatusList: ['status'], // handle by reducer - change the status to bestseelet trending etc.
	getSingleProduct: ['productId'], // handle by saga = fetch single product from back end
	setSingleProduct: ['product'], // handle by reducer
	addToCartProduct: ['product'], // handle by reducer - addto cart product - change state acoord;
	deleteCartProduct: ['product'], // handle by reducer
	registerNewUserSaga: ['user'], // handle by saga - post reques to back end for reg newuser
	registerNewUserStatus: ['status'], // handle by redcuer - cgange state false or true succes
	loginUserSaga: ['user'], // handle by saga - post reques to back end for login user
	loginUserSetData: ['user'], // handle by redcuer - set the data user that come from back
	addProductWishListSaga: ['data'], // handle by saga - post request to back add produc wishlist
	addProductWish: ['product'], // handle by reducer - add prodcut wish to state
	deleteProductWishSaga: ['data'], // handle by saga - delete from backend wish product
	deleteProductWish: ['productId'], // handle by REDCUER - remove wish product from stat wish list
	getWishListProductsSaga: ['token'], // handle by saga - fetch the wish list prodcuts from backend
	setWishListProducts: ['productsList'], // handle by reducer - set the  wishListProducts
	setUserDetailsLocalstorage: ['userDetail'], // handle by reducer
	logOutUser: [], // handle by reducer
	setCartFromLocalstorage: ['cartInfo'], // handle by reducer
	clearCart: [],
	loginUserError: ['message'], // handle by reducer
});

export const EcomShoesTypes = TypesNames;
export const EcomShoesActions = Creators;

/* ------------- Initial State ------------- */
const userDetailes = JSON.parse(window.localStorage.getItem('userData') || '0');
const cartStorage = JSON.parse(window.localStorage.getItem('cart') || '[]');
const userObj = { isLoggedIn: false, id: '', name: '', email: '', isAdmin: false, token: '' };

const cartTotalQtyStorage = JSON.parse(window.localStorage.getItem('cartTotalQty') || '0');
const cartTotalPriceStorage = JSON.parse(window.localStorage.getItem('cartTotalPrice') || '0');

const INITIAL_STATE = createDraft<EcomShoesState>({
	initProductsList: [],
	status: 'all',
	singleProduct: null,
	cart: cartStorage,
	cartTotalQty: cartTotalQtyStorage === '0' ? 0 : cartTotalQtyStorage,
	cartTotalPrice: cartTotalPriceStorage === '0' ? 0 : cartTotalPriceStorage,
	registerNewUserStatus: { error: false, success: false, message: '' },
	loginUserData: userDetailes === 0 ? userObj : userDetailes,
	wishListProducts: [],
	loginUserError: '',
});

/* ------------- Selectors ------------- */

export const ecomShoesSelector = {
	InitProductsList: (state: ApplicationState) => changeListStatus(state),
	productsListFilter: (state: ApplicationState) => state.ecomShoes.initProductsList,
	singleProduct: (state: ApplicationState) => state.ecomShoes.singleProduct,
	cart: (state: ApplicationState) => state.ecomShoes.cart,
	cartTotalQty: (state: ApplicationState) => state.ecomShoes.cartTotalQty,
	cartTotalPrice: (state: ApplicationState) => state.ecomShoes.cartTotalPrice,
	registerNewUserStatus: (state: ApplicationState) => state.ecomShoes.registerNewUserStatus,
	loginUserData: (state: ApplicationState) => state.ecomShoes.loginUserData,
	loginUserError: (state: ApplicationState) => state.ecomShoes.loginUserError,
	wishList: (state: ApplicationState) => state.ecomShoes.wishListProducts,
};

/* ------------- Reducers ------------- */

const ecomShoesReducer = (draft: Draft<EcomShoesState>, action: SetInitProductsAction) => {
	const { productsList } = action;
	draft.initProductsList = productsList;
};
const changeStatusReducer = (draft: Draft<EcomShoesState>, action: ChangeStatusListAction) => {
	const { status } = action;
	draft.status = status;
};

const singleProductReducer = (draft: Draft<EcomShoesState>, action: SetSingleProductAction) => {
	const { product } = action;
	draft.singleProduct = product;
};

const cartReducerAddProduct = (draft: Draft<EcomShoesState>, action: AddToCartProductAction) => {
	const { product } = action;
	const productIndex = draft.cart.findIndex(
		(productItem) =>
			productItem.productId === product.productId &&
			productItem.color === product.color &&
			productItem.size === product.size
	);
	if (productIndex === -1) {
		draft.cart.push(product);
	} else {
		draft.cart[productIndex].qty += product.qty;
	}
	const newCartQty = draft.cart.reduce((acc, obj) => {
		return acc + obj.qty;
	}, 0);

	draft.cartTotalQty = newCartQty;

	const newCartPrice: number = draft.cart.reduce((acc, obj) => {
		return acc + obj.price * obj.qty;
	}, 0);

	draft.cartTotalPrice = newCartPrice;

	window.localStorage.setItem('cart', JSON.stringify(draft.cart));
	window.localStorage.setItem('cartTotalQty', JSON.stringify(draft.cartTotalQty));
	window.localStorage.setItem('cartTotalPrice', JSON.stringify(draft.cartTotalPrice));
};

const cartReducerDeleteProduct = (draft: Draft<EcomShoesState>, action: DeleteCartProductAction) => {
	const { product } = action;

	const indexOfProduct = draft.cart.findIndex((productItem) => {
		return (
			productItem.productId === product.productId &&
			productItem.size === product.size &&
			productItem.color === product.color
		);
	});

	draft.cart.splice(indexOfProduct, 1);
	const newCartQty = draft.cart.reduce((acc, obj) => {
		return acc + obj.qty;
	}, 0);

	draft.cartTotalQty = newCartQty;

	const newCartPrice: number = draft.cart.reduce((acc, obj) => {
		return acc + obj.price * obj.qty;
	}, 0);

	draft.cartTotalPrice = newCartPrice;

	window.localStorage.setItem('cart', JSON.stringify(draft.cart));
	window.localStorage.setItem('cartTotalQty', JSON.stringify(draft.cartTotalQty));
	window.localStorage.setItem('cartTotalPrice', JSON.stringify(draft.cartTotalPrice));
};

const registerNewUserStatusReducer = (draft: Draft<EcomShoesState>, action: RegisterNewUserStatusAction) => {
	const { status } = action;
	draft.registerNewUserStatus.error = status.error;
	draft.registerNewUserStatus.success = status.success;
	draft.registerNewUserStatus.message = status.message;
};

const loginUserReducer = (draft: Draft<EcomShoesState>, action: LoginUserSetDataAction) => {
	const { user } = action;

	draft.loginUserData = user;
	draft.loginUserError = '';

	window.localStorage.setItem('userData', JSON.stringify(user));
};

const wishListSetProductsReducer = (draft: Draft<EcomShoesState>, action: SetWishListProductsAction) => {
	const { productsList } = action;
	draft.wishListProducts = productsList;
};

const wishListAddProductRedcuer = (draft: Draft<EcomShoesState>, action: AddProductWishAction) => {
	const { product } = action;
	draft.wishListProducts.push(product);
};

const wishListRemoveProductRedcuer = (draft: Draft<EcomShoesState>, action: DeleteProductWishAction) => {
	const { productId } = action;
	const indexOfProduct = draft.wishListProducts.findIndex((productItem) => productItem.id === productId);
	draft.wishListProducts.splice(indexOfProduct, 1);
};

const setUserDetailsLocalstorageReducer = (draft: Draft<EcomShoesState>, action: SetUserDetailsLocalstorageAction) => {
	const { userDetail } = action;

	draft.loginUserData = userDetail;
	draft.loginUserData.isLoggedIn = true;
	draft.loginUserError = '';
};

const logOutUserReducer = (draft: Draft<EcomShoesState>) => {
	draft.loginUserData = { isLoggedIn: false, id: '', name: '', email: '', isAdmin: false, token: '' };
	draft.wishListProducts = [];
	draft.loginUserError = '';
	window.localStorage.removeItem('userData');
};

const setCartFromLocalStorageReducer = (draft: Draft<EcomShoesState>, action: SetCartFromLocalstorageAction) => {
	const { cartInfo } = action;

	draft.cart = [...cartInfo.cart];
	draft.cartTotalQty = cartInfo.cartTotalQty;
	draft.cartTotalPrice = cartInfo.cartTotalPrice;
};

const clearCartReducer = (draft: Draft<EcomShoesState>) => {
	window.localStorage.removeItem('cart');
	window.localStorage.removeItem('cartTotalQty');
	window.localStorage.removeItem('cartTotalPrice');
	draft.cart = [];
	draft.cartTotalQty = 0;
	draft.cartTotalPrice = 0;

	// draft.cartTotalPrice = 0,
};

const loginUserErrorReducer = (draft: Draft<EcomShoesState>, action: LoginUserErrorAction) => {
	const { message } = action;

	draft.loginUserError = message;
};
/* --
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_INIT_PRODUCTS]: createReducerCase(ecomShoesReducer),
	[TypesNames.CHANGE_STATUS_LIST]: createReducerCase(changeStatusReducer),
	[TypesNames.SET_SINGLE_PRODUCT]: createReducerCase(singleProductReducer),
	[TypesNames.ADD_TO_CART_PRODUCT]: createReducerCase(cartReducerAddProduct),
	[TypesNames.DELETE_CART_PRODUCT]: createReducerCase(cartReducerDeleteProduct),
	[TypesNames.REGISTER_NEW_USER_STATUS]: createReducerCase(registerNewUserStatusReducer),
	[TypesNames.LOGIN_USER_SET_DATA]: createReducerCase(loginUserReducer),
	[TypesNames.SET_WISH_LIST_PRODUCTS]: createReducerCase(wishListSetProductsReducer),
	[TypesNames.ADD_PRODUCT_WISH]: createReducerCase(wishListAddProductRedcuer),
	[TypesNames.DELETE_PRODUCT_WISH]: createReducerCase(wishListRemoveProductRedcuer),
	[TypesNames.SET_USER_DETAILS_LOCALSTORAGE]: createReducerCase(setUserDetailsLocalstorageReducer),
	[TypesNames.LOG_OUT_USER]: createReducerCase(logOutUserReducer),
	[TypesNames.SET_CART_FROM_LOCALSTORAGE]: createReducerCase(setCartFromLocalStorageReducer),
	[TypesNames.CLEAR_CART]: createReducerCase(clearCartReducer),
	[TypesNames.LOGIN_USER_ERROR]: createReducerCase(loginUserErrorReducer),
});
