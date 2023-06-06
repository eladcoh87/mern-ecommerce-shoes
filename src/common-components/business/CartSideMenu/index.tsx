import * as React from 'react';
import './style.scss';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CartProduct } from 'actions/ecomShoes/interface';
import ClearIcon from '@mui/icons-material/Clear';

export type Props = {
	cartTotalQty: number;
	cartTotalPrice: number;
	cart: CartProduct[];
	deleteProduct: (product: { productId: string; size: string; color: string }) => void;
};

const cartSideMenu: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { cartTotalQty, cartTotalPrice, cart, deleteProduct } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handelClickDel = (product: { productId: string; size: string; color: string }) => {
		deleteProduct(product);
	};
	return (
		<div className="cart-menu-side">
			<Button
				className="cart-btn-menu"
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<div className="cart-box">
					<div>
						<Badge badgeContent={cartTotalQty} color="warning">
							<ShoppingCartOutlinedIcon className="icon-wraper" fontSize="large" />
						</Badge>
					</div>
					<div className="cart-price">
						<p>My Cart</p> <p className="price">${cartTotalPrice}</p>
					</div>
				</div>
			</Button>
			<Menu
				className="cart-panel-menu"
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{cart.length === 0 ? (
					<div className="no-item-cart-wraper">
						<p>Your shopping cart is empty!</p>
					</div>
				) : (
					<div>
						<div className="div-wraper">
							{cart.map((product) => {
								return (
									<div
										key={Math.floor(Math.random() * (1356 - 587 + 1) + 587)}
										className="product-cart-wraper"
									>
										<div className="product-cart-image-wraper">
											<img className="product-cart-image" src={product.image} alt="" />
										</div>
										<div className="product-cart-params-wraper">
											<p className="product-name">
												{product.name} <br />
												<br />
												size: {product.size} <br /> color: {product.color}{' '}
											</p>{' '}
											<p className="product-qty">qty : x {product.qty}</p> <p>${product.price}</p>
										</div>
										<div className="icon-del-wraper">
											{' '}
											<Button
												className="del-btn-cart"
												onClick={() =>
													handelClickDel({
														productId: product.productId,
														size: product.size,
														color: product.color,
													})
												}
												color="primary"
												size="small"
											>
												<ClearIcon fontSize="small" />
											</Button>
										</div>
									</div>
								);
							})}
						</div>
						<div className="total-price-cart-wraper">
							<p>SUBTOTAL:</p>
							<p>${cartTotalPrice}</p>
						</div>
						<div className="vc-ch-wraper">
							<Button className="vc-ch-btn">VIEW CART</Button>
							<Button className="vc-ch-btn">CHECKOUT</Button>
						</div>{' '}
					</div>
				)}
			</Menu>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(cartSideMenu);
