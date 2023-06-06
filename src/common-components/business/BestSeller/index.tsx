import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './style.scss';
import ProductCard from '../ProductCard';
import { Product, CartProduct } from 'actions/ecomShoes/interface';

export type Props = {
	productsList: Product[];
	changeStatus: (status: string) => void;
	addToCartFun: (product: CartProduct) => void;
};

const bestSeller: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { productsList, changeStatus, addToCartFun } = props;

	const [value, setValue] = React.useState('all');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
		changeStatus(newValue);
	};
	return (
		<div className="newArivel-wraper">
			<Container maxWidth="xl" className="newArivel-container">
				<div className="best-Seller-nav">
					<div className="h_line" />

					<div className="tabs-wraper">
						<Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
							<Tab value="all" label="All" />
							<Tab value="best-seller" label="Bestsellers" />
							<Tab value="new-arrivals" label="New Arrivals" />
							<Tab value="trending" label="Trending" />
						</Tabs>
					</div>

					<div className="h_line" />
				</div>

				<div className="product-card-container">
					{productsList.map((product) => (
						<ProductCard addToCartFun={addToCartFun} key={product.id} product={product} />
					))}
				</div>
			</Container>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(bestSeller);
