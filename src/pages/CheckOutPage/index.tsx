import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
// import Container from '@mui/material/Container';
// import { CheckOutPageActions, checkOutPageSelector } from 'actions/redux/checkOutPage';
import './style.scss';

export type Props = {};

export interface OwnProps extends Props, LocalizeContextProps {}

export class CheckOutPage extends React.Component<OwnProps> {
	render() {
		return (
			<div className="checkout-page-container">
				<div className="contect-section">
					<div className="contect-wraper">
						<div>
							<h3>sneaker</h3>
						</div>
						<div className="contect-info-wraper">
							<div>
								<p>Contact information</p>
							</div>
							<div>
								<p>Already have an account? Log in</p>
							</div>
						</div>
						<div className="shipping-info-wraper">
							<div>
								<p>Shipping address</p>
							</div>
							<div>inputfild</div>
							<div>inputfild</div>
							<div>inputfild</div>
							<div>inputfild</div>
							<div>inputfild</div>
						</div>
					</div>
				</div>
				<div className="products-section">
					<div className="products-wraper">
						<div className="prodcuts-list-wrpaer">
							<div>product row</div>
							<div>product row</div>
							<div>product row</div>
							<div>product row</div>
						</div>
						<hr />
						<div className="subtotal-wraper">
							<div>
								<p>subtotal</p> <p>3434$</p>
							</div>
							<div>
								<p>shipping</p> <p>free</p>
							</div>
						</div>
						<div className="total-wraper">
							<p>total</p>
							<p>434$</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default baseConnect<any, any, Props>(
	CheckOutPage,
	(state: ApplicationState) => {
		return {};
	},
	{}
);
