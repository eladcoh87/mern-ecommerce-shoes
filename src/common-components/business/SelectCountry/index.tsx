import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './style.scss';

export type Props = {
	onChange: any;
};

const selectCountry: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [country, setCountry] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		const { onChange } = props;
		onChange(event.target.value as string);
		setCountry(event.target.value as string);
	};
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">select country</InputLabel>
				<Select labelId="demo-simple-select-label" id="demo-simple-select" value={country} onChange={handleChange}>
					<MenuItem value="new-york">new-york</MenuItem>
					<MenuItem value="los-angeles">los-angeles</MenuItem>
					<MenuItem value="california">california</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default withLocalize<Props & LocalizeContextProps>(selectCountry);
