import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Checkbox from '@mui/material/Checkbox';

export type Props = {
	handleCheckBoxClicked: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked: boolean;
};

const checkBox: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { checked } = props;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { handleCheckBoxClicked } = props;
		// setChecked(event.target.checked);
		handleCheckBoxClicked(event);
	};
	return <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />;
};

export default withLocalize<Props & LocalizeContextProps>(checkBox);
