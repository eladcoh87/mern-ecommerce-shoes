import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import './style.scss';
import { Product, CartProduct } from 'actions/ecomShoes/interface';

export type Props = {
	product: Product;
	addToCartFun: (product: CartProduct) => void;
	addtoWish: (productId: string) => void;
	removeFromWishList: (productId: string) => void;
	existInWish: boolean;
};

const productCard: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { addToCartFun, addtoWish, existInWish, removeFromWishList } = props;
	const [isOver, setIsover] = useState(false);
	console.log('come from product card', existInWish);
	const { product } = props;

	const d = new Date(product.date).toISOString().slice(0, 10);

	const handleOnClick = () => {
		const newProduct = {
			productId: product.id || '1',
			name: product.name,
			size: product.sizeInStock[0].size.toString(),
			color: product.colors[0],
			qty: 1,
			price: product.price,
			image: product.image,
			date: product.date,
		};
		addToCartFun(newProduct);
	};
	const handleOnClickWishList = () => {
		addtoWish(product.id || '1');
	};

	const handleOnClickRemoveWish = () => {
		removeFromWishList(product.id || '1');
	};

	return (
		// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
		<div onMouseEnter={() => setIsover(true)} onMouseLeave={() => setIsover(false)} className="product-card-wraper">
			<Link to={`/product/${product.id}`}>
				<Card
					className="product-card"
					style={{
						backgroundImage: `url(${!isOver ? product.image : product.secImage})`,
						transition: '0.5s',
					}}
				/>
			</Link>
			<Rating name="read-only" value={2} readOnly size="small" />

			{!existInWish ? (
				<Button className="wish-list-btn" onClick={handleOnClickWishList} variant="text">
					{' '}
					<FavoriteIcon /> ADD TO WISHLIST
				</Button>
			) : (
				<Button className="wish-list-btn-remove" onClick={handleOnClickRemoveWish} variant="text">
					{' '}
					<PlaylistRemoveIcon /> Remove from wishList
				</Button>
			)}

			<hr />
			<h5>{product.name}</h5>
			<p>{d}</p>
			<p>Shoes</p>
			<p className="price">${product.price}</p>

			<div className="cart-section">
				<hr />
				<div className="atc-button">
					<Button onClick={handleOnClick} variant="text">
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
