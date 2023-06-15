import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

import './style.scss';

export type Props = {};

const navMenuMobile: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="nav-menu-mobile-container">
			<div className="btn-wraper">
				<IconButton id="basic-button" aria-haspopup="true" onClick={handleClick} aria-label="delete">
					<MenuIcon className="menu-icon" />
					<p className="menu-headline">menu</p>
				</IconButton>
			</div>
			{isOpen ? (
				<div className="links-wraper">
					<Divider />
					<div>
						<Link to="/">HOME</Link>
					</div>
					<Divider />
					<div>
						<Link to="/">MEN</Link>
					</div>
					<Divider />
					<div>
						<Link to="/">WOMEN</Link>
					</div>
					<Divider />
					<div>
						<Link to="/all-products">ALL-PRODUCTS</Link>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(navMenuMobile);
