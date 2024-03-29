import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Divider from '@mui/material/Divider';

import './style.scss';

export type Props = {};

const dropNavMenuAccount: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [cur, setCur] = React.useState<number | string>('My Account');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (event: any) => {
		if (event.target.value === 10) setCur('Sign in');
		if (event.target.value === 11) setCur('Register');
		if (event.target.value === 12) setCur('Cart');

		setAnchorEl(null);
	};

	return (
		<div className="dropnavmenu">
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<div className="awwr-raper">
					{cur} <ExpandMoreOutlinedIcon />{' '}
				</div>
			</Button>
			<Menu
				className="dropnavmenu-contaner"
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem value={10} onClick={handleClose}>
					Sign in
				</MenuItem>
				<Divider />
				<MenuItem value={11} onClick={handleClose}>
					Register
				</MenuItem>
				<Divider />
				<MenuItem value={12} onClick={handleClose}>
					Cart
				</MenuItem>
			</Menu>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(dropNavMenuAccount);
