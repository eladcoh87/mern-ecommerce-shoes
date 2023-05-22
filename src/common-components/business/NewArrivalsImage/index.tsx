import { Container } from '@mui/material';
import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Button from '@mui/material/Button';

import './style.scss';

export type Props = {};

const newArrivalsImage: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	return (
		<Container maxWidth="xl" className="NewArraivel-image-container">
			<div className="card">
				<img
					alt="hoodie"
					src="https://images.pexels.com/photos/7445820/pexels-photo-7445820.jpeg?auto=compress&cs=tinysrgb&w=1600"
				/>
				<div className="centered-OVERLY-TEXT"><h3>Opportunities dont happen, you create them</h3> <p className="centered-OVERLY-TEXT-para">It is never too late to be what you might have been</p></div>
				<div className="info">
					<h1>NIKE AIR FORCE</h1>
					<p>Love your family, work super hard, live your passion</p>
					<Button variant="text">View Collection </Button>

				</div>
			</div>
		</Container>
	);
};

export default withLocalize<Props & LocalizeContextProps>(newArrivalsImage);
