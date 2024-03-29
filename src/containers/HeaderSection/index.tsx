/* eslint-disable max-lines */
/* eslint-disable harmony-boilerplate/no-component-did-update */
/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { ApplicationState } from 'actions';
import { Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Tooltip from '@mui/material/Tooltip';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import TextField from '@mui/material/TextField';
import './style.scss';
import DropNavMenu from 'common-components/business/DropNavMenu';
import DropNavMenuAccount from 'common-components/business/DropNavMenuAccount';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Fade from '@mui/material/Fade';
import { EcomShoesActions, ecomShoesSelector } from 'actions/ecomShoes';
import {
	CartProduct,
	ClearCartFunction,
	DeleteCartProductFunction,
	LogOutUserFunction,
	LoginUserData,
	Product,
} from 'actions/ecomShoes/interface';
import SearchProductCard from 'common-components/business/SearchProductCard';
import CartSideMenu from 'common-components/business/CartSideMenu';
import { Dispatch } from 'redux';
import { history } from '@base/features';
import NavMenuMobile from 'common-components/business/NavMenuMobile';

// import { HeaderSectionActions, headerSectionSelector } from 'actions/redux/headerSection';

export type Props = {};

interface State {
	searchValue: string;
	searchFilteredProducts: Product[];
}

export interface OwnProps extends Props, LocalizeContextProps {
	productsList: Product[];
	cartTotalQty: number;
	cartTotalPrice: number;
	cart: CartProduct[];
	wishList: Product[];
	deleteCartProduct: typeof DeleteCartProductFunction;
	loginUserData: LoginUserData;
	logOutUser: typeof LogOutUserFunction;
	clearCart: typeof ClearCartFunction;
}

export class HeaderSection extends React.Component<OwnProps, State> {
	constructor(props: OwnProps) {
		super(props);

		this.state = {
			searchValue: '',
			searchFilteredProducts: [],
		};
	}

	// eslint-disable-next-line consistent-return
	changeSearchValue(value: string): void {
		const { productsList } = this.props;

		if (value.length > 2) {
			const newlist = productsList.filter((product) => {
				return product.name.toLowerCase().includes(value);
			});
			return this.setState({ searchFilteredProducts: newlist });
		}
	}
	deleteItemFromCartHandler(product: { productId: string; size: string; color: string }) {
		const { deleteCartProduct } = this.props;

		deleteCartProduct(product);
	}

	LogOutUserHandler() {
		const { logOutUser } = this.props;
		logOutUser();
	}

	// eslint-disable-next-line consistent-return
	componentDidUpdate(prevProps: Readonly<OwnProps>, prevState: Readonly<State>, snapshot?: any): void {
		const { productsList } = this.props;
		const { searchValue } = this.state;

		if (prevState.searchValue !== searchValue) {
			if (!searchValue) {
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({ searchFilteredProducts: [] });
			}

			if (searchValue.length > 2) {
				const newlist = productsList.filter((product) => {
					return product.name.toLowerCase().includes(searchValue.toLowerCase());
				});
				// eslint-disable-next-line react/no-did-update-set-state
				return this.setState({ searchFilteredProducts: newlist });
			}
		}
	}

	searchProductClicked(productId: string) {
		history.push(`/product/${productId}`);
		this.setState({ searchFilteredProducts: [] });
	}
	render() {
		const { searchValue, searchFilteredProducts } = this.state;
		const { cartTotalQty, cartTotalPrice, cart, wishList, loginUserData, clearCart } = this.props;

		return (
			<div className="header-container">
				<div className="header-gardient">
					<p>
						The overpass went under the highway ands <span>into a secret world</span>,The sky is clear; the
						stars <span>choosing play</span>
					</p>
				</div>
				<Container maxWidth="xl">
					<div className="anuncment-container">
						<div className="anuncment">
							{' '}
							<span>HOT</span>
							<Link to="/#"> New arrivals</Link> / <Link to="/#">Junya watanabe Man</Link>{' '}
							<Link to="/#"> Undercover, Nonnative, Visvim</Link>
						</div>
						<div className="anuncment-links">
							<div className="anucment-link-wrapper">
								<LocationOnOutlinedIcon />
								<Link to="/#">store location</Link>
							</div>
							<div className="anucment-link-wrapper">
								<ListAltOutlinedIcon /> <Link to="/#">Track Your Order</Link>
							</div>
							<div className="anucment-link-wrapper">
								{' '}
								<span>Currency:</span> <DropNavMenu />{' '}
							</div>
							<div className="anucment-link-wrapper">
								<DropNavMenuAccount />
							</div>
						</div>
					</div>
					<div className="line" />

					<div className="search-area">
						<div className="nav-logo">
							<Link to="/">
								{' '}
								SNEA<span>KER.</span>
							</Link>
						</div>
						<div className="support">
							<div>
								<HeadsetMicOutlinedIcon />
							</div>
							<div>
								<p className="support-headline">Cusotmer Support</p>{' '}
								<p>
									<a className="phone-a" href="tel:123-456-7890">
										012-800-456-789
									</a>
								</p>
							</div>
						</div>

						<div className="search-input-contianer">
							{' '}
							<TextField
								placeholder="search on store"
								fullWidth
								value={searchValue}
								// label="serach product"
								id="filled-hidden-label-normal"
								variant="standard"
								onChange={(e: any) => this.setState({ searchValue: e.target.value })}
							/>
							<Button className="btn-search" variant="text">
								Search
							</Button>
							{searchFilteredProducts.length > 0 && (
								<div className="search-results">
									{searchFilteredProducts.map((product) => (
										<SearchProductCard
											key={product.id}
											product={product}
											searchProductClicked={(productId: string) =>
												this.searchProductClicked(productId)
											}
										/>
									))}
								</div>
							)}
						</div>
						<div className="search-area-links">
							<div className="register-box">
								<div>
									<ArrowDropDownCircleOutlinedIcon />
								</div>
								{loginUserData.isLoggedIn ? (
									<div className="logged-in-wraper">
										<p>welcome {loginUserData.name}</p>
										<Button onClick={() => this.LogOutUserHandler()}>logout</Button>
									</div>
								) : (
									<div>
										<p className="useractions reg-p">
											{' '}
											<Link to="/register-user">Register</Link>{' '}
										</p>{' '}
										<p className="useractions">
											or{' '}
											<Link className="sign-p" to="/login-user">
												login
											</Link>
										</p>
									</div>
								)}
							</div>
							<div className="wish-badge">
								<Link to="/wish">
									<Badge badgeContent={wishList.length} color="warning">
										<FavoriteBorderIcon className="icon-wraper" fontSize="large" />
									</Badge>
								</Link>{' '}
							</div>

							<CartSideMenu
								deleteProduct={(product: { productId: string; size: string; color: string }) =>
									this.deleteItemFromCartHandler(product)
								}
								cart={cart}
								cartTotalQty={cartTotalQty}
								cartTotalPrice={cartTotalPrice}
								clearCart={() => clearCart()}
							/>
						</div>
					</div>
				</Container>

				<nav className="nav-header">
					<Container className="nav-container" maxWidth="xl">
						<div className="nav-links">
							<ul>
								<li>
									<Link to="/">HOME</Link>
								</li>
								<li>
									<Link to="/all-products">MEN</Link>
								</li>
								<li>
									<Link to="/all-products">WOMEN</Link>
								</li>
								<li>
									<Link to="/all-products">KIDS</Link>
								</li>

								<li>
									<Link to="/all-products">
										<span className="all-products-span">All-PRODUCTS</span>{' '}
									</Link>
								</li>
							</ul>
						</div>
						<div className="social-links">
							<p>FOLLOW US : </p>

							<div className="social-icons-wraper">
								<div className="social-icons-box">
									<Tooltip
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 600 }}
										classes={{
											tooltip: 'tolltip-social',
											tooltipArrow: 'tolltip-social',
											arrow: 'tolltip-social-arrow',
										}}
										title="Add"
										arrow
									>
										<IconButton aria-label="delete">
											<FacebookIcon />
										</IconButton>
									</Tooltip>
								</div>
								<div className="social-icons-box">
									<Tooltip
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 600 }}
										classes={{
											tooltip: 'tolltip-social',
											tooltipArrow: 'tolltip-social',
											arrow: 'tolltip-social-arrow',
										}}
										title="follow us on social"
										arrow
									>
										<IconButton aria-label="delete">
											<FacebookIcon />
										</IconButton>
									</Tooltip>
								</div>
								<div className="social-icons-box">
									<Tooltip
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 600 }}
										classes={{
											tooltip: 'tolltip-social',
											tooltipArrow: 'tolltip-social',
											arrow: 'tolltip-social-arrow',
										}}
										title="follow us on social"
										arrow
									>
										<IconButton aria-label="delete">
											<PinterestIcon />
										</IconButton>
									</Tooltip>
								</div>
								<div className="social-icons-box">
									<Tooltip
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 600 }}
										classes={{
											tooltip: 'tolltip-social',
											tooltipArrow: 'tolltip-social',
											arrow: 'tolltip-social-arrow',
										}}
										title="follow us on social"
										arrow
									>
										<IconButton aria-label="delete">
											<InstagramIcon />
										</IconButton>
									</Tooltip>
								</div>
							</div>
						</div>
					</Container>
				</nav>
				<NavMenuMobile />
			</div>
		);
	}
}

export default baseConnect<any, any, Props>(
	HeaderSection,
	(state: ApplicationState) => ({
		productsList: ecomShoesSelector.InitProductsList(state),
		cart: ecomShoesSelector.cart(state),
		cartTotalQty: ecomShoesSelector.cartTotalQty(state),
		cartTotalPrice: ecomShoesSelector.cartTotalPrice(state),
		wishList: ecomShoesSelector.wishList(state),
		loginUserData: ecomShoesSelector.loginUserData(state),
	}),
	(dispatch: Dispatch) => ({
		deleteCartProduct: (product: { productId: string; size: string; color: string }) =>
			dispatch(EcomShoesActions.deleteCartProduct(product)),
		logOutUser: () => dispatch(EcomShoesActions.logOutUser()),
		clearCart: () => dispatch(EcomShoesActions.clearCart()),
	})
);
