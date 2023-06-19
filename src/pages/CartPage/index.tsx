/* eslint-disable max-lines-per-function */

/* eslint-disable */
import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import Container from '@mui/material/Container';


import { ecomShoesSelector, EcomShoesActions } from 'actions/ecomShoes';
import { CartProduct, DeleteCartProductFunction } from 'actions/ecomShoes/interface';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { history } from '@base/features';
import Button from '@mui/material/Button';
import CheckBox from 'common-components/business/CheckBox';
import Snackbar from '@mui/material/Snackbar';
import { Dispatch } from 'redux';
import DeleteIcon from '@mui/icons-material/Delete';

import './style.scss';
// import { CartPageActions, cartPageSelector } from 'actions/redux/cartPage';

export type Props = {};

interface State {
	sortPrice: string;
	checked: boolean;
	openSnake: boolean;
}
export interface OwnProps extends Props, LocalizeContextProps {
	cart: CartProduct[];
	cartTotalPrice: number;
	deleteCartProduct: typeof DeleteCartProductFunction;
}

export class CartPage extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			sortPrice: 'lowtohigh',
			checked: false,
			openSnake: false,
		};
	}
	sortedList() {
		const { cart } = this.props;
		const { sortPrice } = this.state;
		const cartCopy = [...cart];
		// let sortedList: CartProduct[];

		if (sortPrice === 'lowtohigh') {
			cartCopy.sort((a, b) => a.price - b.price);
		} else {
			cartCopy.sort((a, b) => b.price - a.price);
		}

		return cartCopy;
	}
	handleCheckBoxClicked(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ checked: event.target.checked });
	}

	handleClickCheckout() {
		const { checked } = this.state;
		if (checked) {
			history.push('/ecom-checkout');
			return;
		}

		this.setState({ openSnake: true });
	}

	handleCloseSnake(event: React.SyntheticEvent | Event, reason?: string) {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ openSnake: false });
	}

	deleteItemFromCartHandler(productId: string, size: string, color: string) {
		const { deleteCartProduct } = this.props;
		const product = { productId, size, color };
		deleteCartProduct(product);
	}
	render() {
		const { sortPrice, checked, openSnake } = this.state;
		const { cart, cartTotalPrice } = this.props;

		return (
			<Container maxWidth="xl" className="cart-table-container">
				{cart.length !== 0 ? (
					<>
						<table>
							<tbody>
								<tr>
									<th>Image</th>
									<th>Product Name </th>
									<th className="th-price">
										Unit Price{' '}
										{sortPrice === 'lowtohigh' ? (
											<IconButton
												size="small"
												onClick={() => this.setState({ sortPrice: 'hightolow' })}
											>
												<KeyboardArrowDownIcon fontSize="inherit" />
											</IconButton>
										) : (
											<IconButton
												size="small"
												onClick={() => this.setState({ sortPrice: 'lowtohigh' })}
											>
												<KeyboardArrowUpIcon fontSize="inherit" />
											</IconButton>
										)}
									</th>
									<th>Quantity</th>
									<th>Delete</th>
								</tr>
								{this.sortedList().map((productItem) => {
									return (
										<tr key={productItem.productId}>
											<td>
												{' '}
												<div className="table-image-wraper">
													<img src={productItem.image} alt="" />
												</div>
											</td>
											<td>{productItem.name}</td>
											<td>{productItem.price}</td>
											<td>{productItem.qty}</td>
											<td>
												<IconButton
													onClick={() =>
														this.deleteItemFromCartHandler(
															productItem.productId,
															productItem.size,
															productItem.color
														)
													}
													aria-label="delete"
													color="primary"
												>
													<div className="delete-icon-btn-wraper">
														<DeleteIcon className="delete-icon-btn" />
													</div>
												</IconButton>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className="accordion-wraper">
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>Special instructions for seller</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
										lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel2a-content"
									id="panel2a-header"
								>
									<Typography>Get shipping info</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
										lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel2a-content"
									id="panel2a-header"
								>
									<Typography>Discount Coupon</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
										lacus ex, sit amet blandit leo lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</div>{' '}
					</>
				) : (
					<div className="empty-cart">
						<h3>Your shopping cart is empty!</h3>
					</div>
				)}
				<div className="subtotal-container">
					<div className="subtotal-wraper">
						<div className="hedline-wraper">
							<h5>Shipping, taxes, and discounts will be calculated at checkout.</h5>
						</div>
						<div className="subtotal-price-wraper">
							<div>
								<p>subtotal:</p>
							</div>
							<div>
								<p>${cartTotalPrice}</p>
							</div>
						</div>
						<div className="agree-wraper">
							{' '}
							<p>
								{' '}
								<CheckBox
									handleCheckBoxClicked={(event: React.ChangeEvent<HTMLInputElement>) =>
										this.handleCheckBoxClicked(event)
									}
									checked={checked}
								/>{' '}
								I agree with the terms and conditions
							</p>{' '}
						</div>
					</div>
				</div>
				<div className="btn-cart-page-container">
					<Button variant="contained" onClick={() => history.push('/all-products')} className="vc-ch-btn">
						continue shopping
					</Button>

					<Button variant="contained" onClick={() => this.handleClickCheckout()} className="vc-ch-btn">
						PROCCED TO CHECK OUT
					</Button>
					<Snackbar
						open={openSnake}
						autoHideDuration={6000}
						onClose={(event) => this.handleCloseSnake(event)}
						message="please agree to the terms"
					/>
				</div>
			</Container>
		);
	}
}

export default baseConnect<any, any, Props>(
	CartPage,
	(state: ApplicationState) => {
		return { cart: ecomShoesSelector.cart(state), cartTotalPrice: ecomShoesSelector.cartTotalPrice(state) };
	},
	(dispatch: Dispatch) => ({
		deleteCartProduct: (product: { productId: string; size: string; color: string }) =>
			dispatch(EcomShoesActions.deleteCartProduct(product)),
	})
);
