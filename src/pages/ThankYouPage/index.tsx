import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import Button from '@mui/material/Button';
import { history } from '@base/features';

import './style.scss';
// import { ThankYouPageActions, thankYouPageSelector } from 'actions/redux/thankYouPage';

export type Props = {};

export interface OwnProps extends Props, LocalizeContextProps {}

export class ThankYouPage extends React.Component<OwnProps> {
	render() {
		return (
			<div className="tanks-caontianer">
				<div className="image-wraper">
					<img src="https://liveandlearnaz.org/wp-content/uploads/2021/01/new-shoes.png" alt="" />

					<div className="btn-wraper">
						<h2>your items will be arrived in 2 business days</h2>
						<div className="btn">
							<Button onClick={() => history.push('/home')} variant="contained">
								HOME PAGE
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default baseConnect<any, any, Props>(
	ThankYouPage,
	(state: ApplicationState) => {
		return {};
	},
	{}
);
