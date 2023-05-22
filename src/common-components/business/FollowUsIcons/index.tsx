import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Fade from '@mui/material/Fade';

import './style.scss';

import { withLocalize, LocalizeContextProps } from 'react-localize-redux';

export type Props = {};

const followUsIcons: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	return (
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
	);
};

export default withLocalize<Props & LocalizeContextProps>(followUsIcons);
