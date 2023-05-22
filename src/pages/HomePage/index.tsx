import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import './style.scss';
import HeroImagesSection from 'common-components/business/HeroImagesSection';
import BestSeller from 'common-components/business/BestSeller';
import NewArrivalsImage from 'common-components/business/NewArrivalsImage';
// import { HomePageActions, homePageSelector } from 'actions/redux/homePage';

const productData = [
	{
		id: 53243,
		name: 'AIR FORCE',
		price: 45,
		imgUrl:
			'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/7-900x900_300x300_crop_center.jpg?v=1529459220',
		imgUrlRepalce:
			'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 5324343,
		name: 'VENUS RUNNING',
		price: 99,
		imgUrl:
			'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/21-900x900_dcd6f997-19a7-4f38-be5e-eb2e1ccc9509_300x300_crop_center.jpg?v=1531152117',
		imgUrlRepalce:
			'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 51214243,
		name: 'SNEAKERS ',
		price: 245,
		imgUrl:
			'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/6-900x900_77dabfc6-0df6-490c-92de-303d30f33106_300x300_crop_center.jpg?v=1530124731',
		imgUrlRepalce:
			'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 989243,
		name: 'PREDETOR ',
		price: 78,
		imgUrl:
			'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/5-900x900_1bbac911-f81f-4274-9c08-cdd7a370bcc1_300x300_crop_center.jpg?v=1530124805',
		imgUrlRepalce:
			'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
];

export type Props = {};

export interface OwnProps extends Props, LocalizeContextProps {}

export class HomePage extends React.Component<OwnProps> {
	render() {
		return (
			<div className="home-container">
				<HeroImagesSection />
				<BestSeller ProductData={productData} />
				<NewArrivalsImage />
			</div>
		);
	}
}

export default baseConnect<any, any, Props>(
	HomePage,
	(state: ApplicationState) => {
		return {};
	},
	{}
);
