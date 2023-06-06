import * as React from 'react';
import './style.scss';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';

export type Props = {
	pathName: string;
};

// function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
// 	event.preventDefault();
// 	console.info('You clicked a breadcrumb.');
// }

const breadcrumb: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { pathName } = props;
	const breadcrumbs = [
		<RouterLink color="inherit" key="1" to="/">
			{' '}
			<span className="breadcrumbs-link">Home</span>
		</RouterLink>,

		<span className="breadcrumbs-path" key="3">
			{pathName}
		</span>,
	];
	return (
		<div className="breadcrumbs-container">
			{' '}
			<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
				{breadcrumbs}
			</Breadcrumbs>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(breadcrumb);
