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
});

export const EcomShoesTypes = TypesNames;
export const EcomShoesActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<EcomShoesState>({
	initProductsList: [],
	status: 'all',
	singleProduct: null,
	cart: [],
	cartTotalQty: 0,
	cartTotalPrice: 0,
	registerNewUserStatus: { error: false, success: false, message: '' },
	loginUserData: { isLoggedIn: false, id: '', name: '', email: '', isAdmin: false, token: '' },
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
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(INITIAL_STATE, {
	[TypesNames.SET_INIT_PRODUCTS]: createReducerCase(ecomShoesReducer),
	[TypesNames.CHANGE_STATUS_LIST]: createReducerCase(changeStatusReducer),
	[TypesNames.SET_SINGLE_PRODUCT]: createReducerCase(singleProductReducer),
	[TypesNames.ADD_TO_CART_PRODUCT]: createReducerCase(cartReducerAddProduct),
	[TypesNames.DELETE_CART_PRODUCT]: createReducerCase(cartReducerDeleteProduct),
	[TypesNames.REGISTER_NEW_USER_STATUS]: createReducerCase(registerNewUserStatusReducer),
	[TypesNames.LOGIN_USER_SET_DATA]: createReducerCase(loginUserReducer),
});
