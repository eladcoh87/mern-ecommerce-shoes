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
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Fade from '@mui/material/Fade';

// import { HeaderSectionActions, headerSectionSelector } from 'actions/redux/headerSection';

export type Props = {};

export interface OwnProps extends Props, LocalizeContextProps {}

export class HeaderSection extends React.Component<OwnProps> {
	render() {
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
							SNEA<span>KER.</span>
						</div>
						<div className="support">
							<div>
								<HeadsetMicOutlinedIcon />
							</div>
							<div>
								<p className="support-headline">Cusotmer Support</p> <p>012-800-456-789</p>
							</div>
						</div>

						<div className="search-input-contianer">
							{' '}
							<TextField
								placeholder="search on store"
								fullWidth
								// label="serach product"
								id="filled-hidden-label-normal"
								defaultValue=""
								variant="standard"
							/>
							<Button className="btn-search" variant="text">
								Search
							</Button>
						</div>
						<div className="search-area-links">
							<div className="register-box">
								<div>
									<ArrowDropDownCircleOutlinedIcon />
								</div>
								<div>
									<p className="useractions reg-p">
										{' '}
										<Link to="/register">Register</Link>{' '}
									</p>{' '}
									<p className="useractions">
										or{' '}
										<Link className="sign-p" to="/register">
											sign in
										</Link>
									</p>
								</div>
							</div>
							<div className="wish-badge">
								<Link to="/wish">
									<Badge badgeContent={4} color="warning">
										<FavoriteBorderIcon className="icon-wraper" fontSize="large" />
									</Badge>
								</Link>{' '}
							</div>
							<div className="cart-box">
								<Link className="cart-box" to="/cart">
									<div>
										<Badge badgeContent={4} color="warning">
											<ShoppingCartOutlinedIcon className="icon-wraper" fontSize="large" />
										</Badge>
									</div>
									<div className="cart-price">
										<p>My Cart</p> <p className="price">$0.00</p>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</Container>

				<nav className="nav-header">
					<Container className="nav-container" maxWidth="xl">
						<div className="nav-links">
							<ul>
								<li>
									<Link to="/home">HOME</Link>
								</li>
								<li>
									<Link to="/men">MEN</Link>
								</li>
								<li>
									<Link to="/women">WOMEN</Link>
								</li>
								<li>
									<Link to="/kids">KIDS</Link>
								</li>

								<li>
									<Link to="/top-products">TOP-PRODUCTS</Link>
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
			</div>
		);
	}
}

export default baseConnect<any, any, Props>(
	HeaderSection,
	(state: ApplicationState) => {
		return {};
	},
	{}
);
