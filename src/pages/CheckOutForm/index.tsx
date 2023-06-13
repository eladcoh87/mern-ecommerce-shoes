/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { InjectedFormProps, Form, getFormValues, ConfigProps } from 'redux-form';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { FieldInput } from 'common-components/controllers';
import { alphaNumeric, email, maxLength, required } from 'utils/validations';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ecomShoesSelector } from 'actions/ecomShoes';

import './style.scss';
import FieldInputCountry from 'common-components/controllers/FieldInputCountry';
import { CartProduct } from 'actions/ecomShoes/interface';
import Badge from '@mui/material/Badge';

// import { CheckOutFormActions, checkOutFormSelector } from 'actions/redux/checkOutForm';

export type Props = {} & ConfigProps;

type FormValues = {};

export interface OwnProps extends Props, LocalizeContextProps {
	formValues: (formName: string) => FormValues;
	cart: CartProduct[];
	cartTotalPrice: number;
}

export class CheckOutForm extends React.Component<OwnProps & InjectedFormProps> {
	render() {
		const { handleSubmit, cart, cartTotalPrice } = this.props;
		return (
			<Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
				<div className="checkout-page-container">
					<div className="contect-section">
						<div className="contect-wraper">
							<div>
								<h3>
									Snea<span>ker.</span>{' '}
								</h3>
							</div>
							<div className="contect-info-wraper">
								<div className="contect-information">
									<p>Contact information</p>
									<p>Already have an account? Log in</p>
								</div>
								<div className="email-wraper">
									<FieldInput
										fullWidth
										name="email"
										type="email"
										placeholder="enter your Email"
										validate={email}
									/>
									<div className="check-box-wraper">
										{' '}
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Email me with news and offers"
										/>
									</div>
								</div>
							</div>
							<div className="shipping-info-wraper">
								<div className="shipping-info-headline">
									<p>Shipping address</p>
								</div>
								<div className="country-selected-wraper">
									<FieldInputCountry name="countrySelected" />
								</div>
								<div className="name-wraper">
									<div>
										<FieldInput
											fullWidth
											name="firstname"
											type="text"
											placeholder="first name"
											validate={[required, maxLength]}
											warn={alphaNumeric}
										/>
									</div>
									<div>
										<FieldInput
											fullWidth
											name="lastname"
											type="text"
											placeholder="last name"
											validate={[required, maxLength]}
											warn={alphaNumeric}
										/>
									</div>
								</div>
								<div className="genric-filed-wraper">
									<FieldInput
										fullWidth
										name="street"
										type="text"
										placeholder="street"
										validate={[required]}
										warn={alphaNumeric}
									/>
								</div>
								<div className="genric-filed-wraper">
									<FieldInput
										fullWidth
										name="apartment"
										type="text"
										placeholder="Apartment"
										validate={[required]}
										warn={alphaNumeric}
									/>
								</div>
								<div className="name-wraper">
									<div>
										<FieldInput
											fullWidth
											name="Postalcode"
											type="text"
											placeholder="Postal code"
											validate={[required]}
											warn={alphaNumeric}
										/>
									</div>
									<div>
										<FieldInput
											fullWidth
											name="city"
											type="text"
											placeholder="City"
											validate={[required]}
											warn={alphaNumeric}
										/>
									</div>
								</div>
								<div className="genric-filed-wraper">
									{' '}
									<FieldInput
										fullWidth
										name="phone"
										type="text"
										placeholder="Phone"
										validate={[required]}
									/>
								</div>
								<div className="payment-wraper">
									<p className="headline">Payment information</p>
								</div>
								<div className="name-wraper">
									<div>
										<FieldInput
											fullWidth
											name="cardnumber"
											type="text"
											placeholder="credit cart number"
											validate={[required]}
											warn={alphaNumeric}
										/>
									</div>
									<div>
										<FieldInput
											fullWidth
											name="ccv"
											type="text"
											placeholder="ccv"
											validate={[required]}
											warn={alphaNumeric}
										/>
									</div>
								</div>
								<div className="check-box-wraper">
									{' '}
									<FormControlLabel
										control={<Checkbox defaultChecked />}
										label="save this information"
									/>
								</div>

								<div className="submit-wraper">
									<div>
										{' '}
										<Link to="/cart-page">&#x27F5; Return to cart </Link>{' '}
									</div>
									<div className="btn-wraper">
										{' '}
										<Button type="submit" variant="contained">
											PAY
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="products-section">
						<div className="products-wraper">
							<div className="prodcuts-list-wraper">
								{cart.length !== 0 ? (
									cart.map((product) => {
										return (
											<div className="product-row-wraper" key={product.productId}>
												<div className="product-details-wraper">
													<div className="product-image-wraper">
														{' '}
														<Badge badgeContent={product.qty} color="primary" />
														<img src={product.image} alt="" />
													</div>
													<div>
														{' '}
														<p>{product.name}</p>
														<p>
															{product.size} / {product.color}{' '}
														</p>
													</div>
												</div>
												<div>${product.price}</div>
											</div>
										);
									})
								) : (
									<h2 style={{ marginBottom: '20px' }}>please add product to cart</h2>
								)}
							</div>
							<hr />
							<div className="subtotal-wraper">
								<div className="subtotal">
									<p>subtotal</p> <p>${cartTotalPrice}</p>
								</div>
								<div className="subtotal">
									<p>shipping</p> <p>free</p>
								</div>
							</div>
							<hr />
							<div className="total-wraper">
								<p>Total</p>
								<p>${cartTotalPrice}</p>
							</div>
						</div>
					</div>
				</div>
			</Form>
		);
	}

	handleSubmit(formValues: FormValues) {
		const { valid } = this.props;

		console.log(formValues, valid);
		// handle submit here
	}
}

export default baseConnectForm<any, any, Props>(
	CheckOutForm,
	(state: ApplicationState) => {
		return {
			formValues: (formName: string) => getFormValues(formName)(state),
			cart: ecomShoesSelector.cart(state),
			cartTotalPrice: ecomShoesSelector.cartTotalPrice(state),
		};
	},
	{},
	{}
);
