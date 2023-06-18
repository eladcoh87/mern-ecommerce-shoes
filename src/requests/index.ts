/* eslint-disable implicit-arrow-linebreak */
/**
 * Here you add all the apis urls defenition
 */

import request from '@base/features/base-api';
import { NewUser } from 'actions/ecomShoes/interface';
import { AxiosResponse } from 'axios';
import { config } from 'config';

export interface Api {
	getDevices: () => Promise<AxiosResponse>;
	getInitProductsList: () => Promise<AxiosResponse>;
	getSingleProduct: (productId: string) => Promise<AxiosResponse>;
	postRegNewUser: (user: NewUser) => Promise<AxiosResponse>;
	postLoginUser: (user: { email: string; password: string }) => Promise<AxiosResponse>;
	postWishListProduct: (data: { productId: string; token: string }) => Promise<AxiosResponse>;
	deleteWishListProduct: (data: { productId: string; token: string }) => Promise<AxiosResponse>;
	getWishListAllProducts: (token: string) => Promise<AxiosResponse>;
}

export const createApi = (baseURL = config.ROOT_SERVER_URL): Api => ({
	getDevices: () =>
		request.call({
			baseURL: 'http://6ew7g.mocklab.io/' || baseURL,
			method: 'get',
			url: '/getlatestWithCustomResponseCode',
		}),
	getInitProductsList: () =>
		request.call({
			baseURL: 'https://ecommerce-express.vercel.app/api/products/allproducts' || baseURL,
			method: 'get',
		}),
	getSingleProduct: (productId) =>
		request.call({
			baseURL: `https://ecommerce-express.vercel.app/api/products/singleProduct/${productId}` || baseURL,
			method: 'get',
		}),
	postRegNewUser: (user) =>
		request.call({
			baseURL: 'https://ecommerce-express.vercel.app/api/user/register-user' || baseURL,
			method: 'post',
			data: { user },
		}),
	postLoginUser: (user) =>
		request.call({
			baseURL: 'https://ecommerce-express.vercel.app/api/user/login-user' || baseURL,
			method: 'post',
			data: { user },
		}),
	postWishListProduct: (data) =>
		request.call({
			baseURL: 'https://ecommerce-express.vercel.app/api/wishlist/product' || baseURL,
			method: 'post',
			data: { productId: data.productId },
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${data.token}`,
			},
		}),
	deleteWishListProduct: (data) =>
		request.call({
			baseURL: `https://ecommerce-express.vercel.app/api/wishlist/product/${data.productId}` || baseURL,
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${data.token}`,
			},
		}),
	getWishListAllProducts: (token) =>
		request.call({
			baseURL: 'https://ecommerce-express.vercel.app/api/wishlist/allproducts' || baseURL,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}),
});

export default createApi();
