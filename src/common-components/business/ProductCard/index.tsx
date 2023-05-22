import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import './style.scss';

export type Props = {
	product: { id: number; name: string; price: number; imgUrl: string; imgUrlRepalce: string };
};

const productCard: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [isOver, setIsover] = useState(false);
	const { product } = props;

	return (
		// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
		<div onMouseEnter={() => setIsover(true)} onMouseLeave={() => setIsover(false)} className="product-card-wraper">
			<Card
				className="product-card"
				style={{
					backgroundImage: `url(${!isOver ? product.imgUrl : product.imgUrlRepalce})`,
					transition: '0.5s',
				}}
			/>
			<Rating name="read-only" value={2} readOnly size="small" />

			<hr />
			<h5>{product.name}</h5>
			<p>Shoes</p>
			<p className="price">${product.price}</p>

			<div className="cart-section">
				<hr />
				<div className="atc-button">
					<Button variant="text">
						{' '}
						<ShoppingCartOutlinedIcon /> ADD TO CART
					</Button>
				</div>
			</div>
			<span className="notify-badge">NEW</span>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(productCard);
