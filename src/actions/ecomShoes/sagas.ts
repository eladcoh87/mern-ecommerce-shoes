/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-tabs */
import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from 'requests';
import { EcomShoesActions } from 'actions/ecomShoes';
import {
	GetInitProductsSagaAction,
	Product,
	GetSingleProductAction,
	RegisterNewUserSagaAction,
	ResponseNewUser,
	LoginUserSagaAction,
	ResponseDataUserLogin,
	AddProductWishListSagaAction,
	GetWishListProductsSagaAction,
	AllProductsList,
	AddProductWishResponse,
	DeleteProductWishSagaAction,
} from 'actions/ecomShoes/interface';
import { history } from '@base/features';

export function* fetchInitProductsListSaga(action: GetInitProductsSagaAction) {
	const response: AxiosResponse<Product[]> = yield call(api.getInitProductsList);

	const newProductList = response.data.map((product: Product) => {
		const {
			_id,
			name,
			image,
			secImage,
			description,
			price,
			sizeInStock,
			status,
			categories,
			colors,
			company,
			date,
		} = product;

		const newSizeInStock = sizeInStock.map((obj) => {
			const newObj = {
				size: obj.size,
				stockCount: obj.stockCount,
			};

			return newObj;
		});

		const newProductObject = {
			id: _id,
			name,
			image,
			secImage,
			description,
			price,
			sizeInStock: newSizeInStock,
			status,
			categories,
			colors,
			company,
			date,
		};
		return newProductObject;
	});

	yield put(EcomShoesActions.setInitProducts(newProductList));
}

export function* fetchSingleProductSaga(action: GetSingleProductAction) {
	const { productId } = action;
	const response: AxiosResponse<Product> = yield call(api.getSingleProduct, productId);

	yield put(EcomShoesActions.setSingleProduct(response.data));
}

export function* registerNewUserSagaFunc(action: RegisterNewUserSagaAction) {
	const { user } = action;

	const response: AxiosResponse<ResponseNewUser> = yield call(api.postRegNewUser, user);

	if (response.status === 201) {
		const status = { success: true, message: response.data.message, error: false };
		yield put(EcomShoesActions.registerNewUserStatus(status));
		history.push('/login-user');
	}

	if (response.status !== 201) {
		yield put(
			EcomShoesActions.registerNewUserStatus({ success: false, message: response.data.message, error: true })
		);
	}
}

export function* loginUserSagaFunc(action: LoginUserSagaAction) {
	const { user } = action;

	const response: AxiosResponse<ResponseDataUserLogin> = yield call(api.postLoginUser, user);
	const { data } = response;
	if (response.status === 201) {
		const newUser = { isLoggedIn: true, ...data.newUser };

		yield put(EcomShoesActions.loginUserSetData(newUser));
		history.push('/');
	}
}

export function* addProductWishListSagaFunc(action: AddProductWishListSagaAction) {
	const { data } = action;

	const response: AxiosResponse<AddProductWishResponse> = yield call(api.postWishListProduct, data);
	console.log(response);

	const {
		_id,
		name,
		image,
		secImage,
		description,
		price,
		sizeInStock,
		status,
		categories,
		colors,
		company,
		date,
	} = response.data.wishProduct;

	const newSizeInStock = sizeInStock.map((obj) => {
		const newObj = {
			size: obj.size,
			stockCount: obj.stockCount,
		};

		return newObj;
	});
	const newProductObject = {
		id: _id,
		name,
		image,
		secImage,
		description,
		price,
		sizeInStock: newSizeInStock,
		status,
		categories,
		colors,
		company,
		date,
	};

	yield put(EcomShoesActions.addProductWish(newProductObject));
}

export function* fetchWishListProducts(action: GetWishListProductsSagaAction) {
	const { token } = action;

	const response: AxiosResponse<AllProductsList> = yield call(api.getWishListAllProducts, token);
	if (response.data.message === 'wishList is empty - no products') {
		return;
	}
	console.log(response);
	const newProductList = response.data.allProductsList.map((product: Product) => {
		const {
			_id,
			name,
			image,
			secImage,
			description,
			price,
			sizeInStock,
			status,
			categories,
			colors,
			company,
			date,
		} = product;

		const newSizeInStock = sizeInStock.map((obj) => {
			const newObj = {
				size: obj.size,
				stockCount: obj.stockCount,
			};

			return newObj;
		});

		const newProductObject = {
			id: _id,
			name,
			image,
			secImage,
			description,
			price,
			sizeInStock: newSizeInStock,
			status,
			categories,
			colors,
			company,
			date,
		};
		return newProductObject;
	});

	yield put(EcomShoesActions.setWishListProducts(newProductList));
}

export function* deleteProductWishListSagaFunc(action: DeleteProductWishSagaAction) {
	const { data } = action;
	const { productId } = data;
	const response: AxiosResponse = yield call(api.deleteWishListProduct, data);
	console.log(response);

	yield put(EcomShoesActions.deleteProductWish(productId));
}
