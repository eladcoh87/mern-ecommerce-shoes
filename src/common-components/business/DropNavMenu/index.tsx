import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Divider from '@mui/material/Divider';

import './style.scss';

export type Props = {};

const dropNavMenu: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [cur, setCur] = React.useState<number | string>('USD');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (event: any) => {
		if (event.target.value === 10) setCur('USD');
		if (event.target.value === 11) setCur('EUP');
		if (event.target.value === 12) setCur('DEB');

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
					USD
				</MenuItem>
				<Divider />
				<MenuItem value={11} onClick={handleClose}>
					EUP
				</MenuItem>
				<Divider />
				<MenuItem value={12} onClick={handleClose}>
					DEB
				</MenuItem>
				
			</Menu>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(dropNavMenu);
