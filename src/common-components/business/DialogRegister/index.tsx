import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './style.scss';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { Link } from 'react-router-dom';

export type Props = {
	isOpend: boolean;
	onCloseFunc: () => void;
};

const dialogRegister: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { isOpend, onCloseFunc } = props;

	const handleClose = () => {
		onCloseFunc();
		// setIsOpend(false);
	};

	return (
		<div>
			<Dialog
				open={isOpend}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">registration successful - please login</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Link to="/login-user">
							<Button onClick={handleClose} autoFocus>
								Take me to Login
							</Button>
						</Link>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(dialogRegister);
