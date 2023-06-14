import { Product } from 'actions/ecomShoes/interface';
import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Divider from '@mui/material/Divider';

import './style.scss';

export type Props = {
	product: Product;
	searchProductClicked: (productId: string | undefined) => void;
};

const searchProductCard: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { product, searchProductClicked } = props;
	return (
		<>
			<div
				aria-hidden="true"
				className="search-product-container"
				onClick={() => searchProductClicked(product.id)}
				onKeyDown={() => searchProductClicked(product.id)}
			>
				<div className="search-product-image-wraper">
					<img src={product.image} alt="" />
				</div>
				<div className="search-product-contant-wraper">
					<p>{product.name}</p>
					<p>${product.price}</p>
				</div>
			</div>
			<Divider />
		</>
	);
};

export default withLocalize<Props & LocalizeContextProps>(searchProductCard);
