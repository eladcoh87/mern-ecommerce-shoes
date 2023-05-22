import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './style.scss';
import ProductCard from '../ProductCard';

type Product = { id: number; name: string; price: number; imgUrl: string; imgUrlRepalce: string }[];

export type Props = {
	ProductData: Product;
};

const bestSeller: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { ProductData } = props;

	console.log(ProductData);
	const [value, setValue] = React.useState(2);
	console.log(value);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<div className="newArivel-wraper">
			<Container maxWidth="xl" className="newArivel-container">
				<div className="best-Seller-nav">
					<div className="h_line" />

					<div className="tabs-wraper">
						<Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
							<Tab label="Bestsellers" />
							<Tab label="New Arrivals" />
							<Tab label="Trending" />
						</Tabs>
					</div>

					<div className="h_line" />
				</div>

				<div className="product-card-container">
					{ProductData.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</Container>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(bestSeller);
