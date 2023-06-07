import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/ecomShoes/sagas';
import { EcomShoesTypes } from 'actions/ecomShoes';

/* ------------- Export Redux ------------- */
export * from 'actions/ecomShoes/redux';

/* ------------- Export Sagas ------------- */
function* getProductsWatcherSaga() {
	yield takeLatest(EcomShoesTypes.GET_INIT_PRODUCTS_SAGA, createSaga(Sagas.fetchInitProductsListSaga));
}

function* getSingleProductWatcherSaga() {
	yield takeLatest(EcomShoesTypes.GET_SINGLE_PRODUCT, createSaga(Sagas.fetchSingleProductSaga));
}

function* registerNewUserSaga() {
	yield takeLatest(EcomShoesTypes.REGISTER_NEW_USER_SAGA, createSaga(Sagas.registerNewUserSagaFunc));
}
function* loginUserSaga() {
	yield takeLatest(EcomShoesTypes.LOGIN_USER_SAGA, createSaga(Sagas.loginUserSagaFunc));
}

function* addProductWishListSaga() {
	yield takeLatest(EcomShoesTypes.ADD_PRODUCT_WISH_LIST_SAGA, createSaga(Sagas.addProductWishListSagaFunc));
}

function* deleteProductWishListSaga() {
	yield takeLatest(EcomShoesTypes.DELETE_PRODUCT_WISH_SAGA, createSaga(Sagas.deleteProductWishListSagaFunc));
}
function* getWishListProductsSaga() {
	yield takeLatest(EcomShoesTypes.GET_WISH_LIST_PRODUCTS_SAGA, createSaga(Sagas.fetchWishListProducts));
}

// TODO: Do Not Forget to Add your new saga to index file
export function* ecomShoesSaga() {
	yield all([
		fork(getProductsWatcherSaga),
		fork(getSingleProductWatcherSaga),
		fork(registerNewUserSaga),
		fork(loginUserSaga),
		fork(addProductWishListSaga),
		fork(getWishListProductsSaga),
		fork(deleteProductWishListSaga),
	]);
}
