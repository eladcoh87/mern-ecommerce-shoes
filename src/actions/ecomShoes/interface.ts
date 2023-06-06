import { Action } from 'redux';

//! define state //  :
export interface SizeInStock {
	size: number;
	stockCount: number;
}
export interface Product {
	_id?: string;
	id: string | undefined;
	name: string;
	image: string;
	secImage: string;
	description: string;
	price: number;
	sizeInStock: SizeInStock[];
	status: string;
	categories: string[];
	colors: string[];
	company: string;
	date: Date;
}

export interface CartProduct {
	productId: string;
	name: string;
	size: string;
	color: string;
	qty: number;
	price: number;
	image: string;
	date: Date;
}

export interface DelProduct {
	productId: string;
	size: string;
	color: string;
}

export interface NewUser {
	name: string;
	password: string;
	email: string;
}
export interface LoginUserData {
	isLoggedIn: boolean;
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	token: string;
}
//!  end - define state //

/* ------------- Define Actions and State ------------- */
export interface EcomShoesState {
	initProductsList: Product[];
	status: string;
	singleProduct: Product | null;
	cart: CartProduct[];
	cartTotalQty: number;
	cartTotalPrice: number;
	registerNewUserStatus: { error: boolean; success: boolean; message: string };
	loginUserData: LoginUserData;
}

export enum TypesNames {
	GET_INIT_PRODUCTS_SAGA = 'GET_INIT_PRODUCTS_SAGA', // handle by saga - fetch the prodcuts list from backend
	SET_INIT_PRODUCTS = 'SET_INIT_PRODUCTS', // handle by reducer - set the  init products list to state
	CHANGE_STATUS_LIST = 'CHANGE_STATUS_LIST', // handle by reducer - change status in state
	GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT', // handle by saga = fetch single product from back end
	SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT', // handle by reducer - set single product from backend
	ADD_TO_CART_PRODUCT = 'ADD_TO_CART_PRODUCT', // handle by reducer - add to cart item change the state
	DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT', // handle by reducer
	REGISTER_NEW_USER_SAGA = 'REGISTER_NEW_USER_SAGA', // handle by SAGA
	REGISTER_NEW_USER_STATUS = 'REGISTER_NEW_USER_STATUS', // handle by REDUCER
	LOGIN_USER_SAGA = 'LOGIN_USER_SAGA', // handle by SAGA
	LOGIN_USER_SET_DATA = 'LOGIN_USER_SET_DATA', // handle by REDUCER
}

export declare function GetInitProductsSagaFunction(): GetInitProductsSagaAction;
export declare function SetInitProductsFunction(productsList: Product[]): SetInitProductsAction;
export declare function ChangeStatusListFunction(status: string): ChangeStatusListAction;
export declare function GetSingleProductFunction(productId: string): GetSingleProductAction;
export declare function SetSingleProductFunction(product: Product): SetSingleProductAction;
export declare function AddToCartProductFunction(product: CartProduct): AddToCartProductAction;
export declare function DeleteCartProductFunction(product: DelProduct): DeleteCartProductAction;
export declare function RegisterNewUserSagaFunction(user: NewUser): RegisterNewUserSagaAction;
export declare function RegisterNewUserStatusFunction(status: {
	error: boolean;
	success: boolean;
	message: string;
}): RegisterNewUserStatusAction;

export declare function LoginUserSagaFunction(user: { email: string; password: string }): LoginUserSagaAction;

export declare function LoginUserSetDataFunction(user: LoginUserData): LoginUserSetDataAction;

export interface ActionCreator {
	getInitProductsSaga: typeof GetInitProductsSagaFunction;
	setInitProducts: typeof SetInitProductsFunction;
	changeStatusList: typeof ChangeStatusListFunction;
	getSingleProduct: typeof GetSingleProductFunction;
	setSingleProduct: typeof SetSingleProductFunction;
	addToCartProduct: typeof AddToCartProductFunction;
	deleteCartProduct: typeof DeleteCartProductFunction;
	registerNewUserSaga: typeof RegisterNewUserSagaFunction;
	registerNewUserStatus: typeof RegisterNewUserStatusFunction;
	loginUserSaga: typeof LoginUserSagaFunction;
	loginUserSetData: typeof LoginUserSetDataFunction;
}
export type GetInitProductsSagaAction = Action<TypesNames.GET_INIT_PRODUCTS_SAGA>;

export interface SetInitProductsAction extends Action<TypesNames.SET_INIT_PRODUCTS> {
	productsList: Product[];
}
export interface ChangeStatusListAction extends Action<TypesNames.CHANGE_STATUS_LIST> {
	status: string;
}

export interface GetSingleProductAction extends Action<TypesNames.GET_SINGLE_PRODUCT> {
	productId: string;
}

export interface SetSingleProductAction extends Action<TypesNames.SET_SINGLE_PRODUCT> {
	product: Product;
}

export interface AddToCartProductAction extends Action<TypesNames.ADD_TO_CART_PRODUCT> {
	product: CartProduct;
}

export interface DeleteCartProductAction extends Action<TypesNames.DELETE_CART_PRODUCT> {
	product: DelProduct;
}
export interface RegisterNewUserSagaAction extends Action<TypesNames.REGISTER_NEW_USER_SAGA> {
	user: NewUser;
}
export interface RegisterNewUserStatusAction extends Action<TypesNames.REGISTER_NEW_USER_STATUS> {
	status: { error: boolean; success: boolean; message: string };
}

export interface LoginUserSagaAction extends Action<TypesNames.LOGIN_USER_SAGA> {
	user: { email: string; password: string };
}

export interface LoginUserSetDataAction extends Action<TypesNames.LOGIN_USER_SET_DATA> {
	user: LoginUserData;
}

/* ------------- Define Any Interfaces ------------- */

export interface ResponseSingleProduct {
	_id?: string;
	id: string | undefined;
	name: string;
	image: string;
	secImage: string;
	description: string;
	price: number;
	sizeInStock: SizeInStock[];
	status: string;
	categories: string[];
	colors: string[];
	company: string;
	date: Date;
}

export interface ResponseNewUser {
	message: string;
	success: boolean;
}

export interface ResponseDataUserLogin {
	newUser: { id: string; name: string; email: string; isAdmin: boolean; token: string };
}
