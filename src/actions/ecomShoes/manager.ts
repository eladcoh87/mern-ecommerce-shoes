// Here you right all the "sdk" ( managers, utils etc .. )
// actually here is a function that are not saga and should return simple values without dispatch
// for example function that get a and b and return a + b
import { ApplicationState } from 'actions';
import { Product } from './interface';

export const changeListStatus = (state: ApplicationState) => {
	if (state.ecomShoes.status === 'all') {
		return state.ecomShoes.initProductsList;
	}

	const filteredList = state.ecomShoes.initProductsList.filter((product: Product) => {
		if (product.status !== state.ecomShoes.status) {
			return false;
		}

		return true;
	});

	return filteredList;
};

