import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';

import './style.scss';

export type Props = {};

const navMenuMobile: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className="nav-menu-mobile-container">
			<IconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				aria-label="delete"
			>
				<MenuIcon className="menu-icon" />
				<p className="menu-headline">menu</p>
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>HOME </MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>MEN</MenuItem>
				<MenuItem onClick={handleClose}>WOMEN</MenuItem>
				<MenuItem onClick={handleClose}>KIDS</MenuItem>
				<MenuItem onClick={handleClose}>All-PRODUCTS</MenuItem>
			</Menu>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(navMenuMobile);
