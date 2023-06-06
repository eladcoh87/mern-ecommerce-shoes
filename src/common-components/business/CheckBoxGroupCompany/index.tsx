import * as React from 'react';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './style.scss';

export type Props = {
	onBrandChange: (brand: any) => void;
};

const checkBoxGroupCompany: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [state, setState] = React.useState({
		company1: false,
		company2: false,
		company3: false,
		company4: false,
		company5: false,
	});
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { onBrandChange } = props;
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});

		// const priceObj = { ...state, [event.target.name]: event.target.checked };
		onBrandChange(event.target.value);
	};

	const { company1, company2, company3, company4, company5 } = state;

	return (
		<Box className="checkBox-Container" sx={{ display: 'flex' }}>
			<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
				<FormLabel component="legend"><h3>Brand</h3></FormLabel>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox value="asics" checked={company1} onChange={handleChange} name="company1" />}
						label="asics"
					/>
					<FormControlLabel
						control={<Checkbox value="rebook" checked={company2} onChange={handleChange} name="company2" />}
						label="rebook"
					/>
					<FormControlLabel
						control={<Checkbox value="puma" checked={company3} onChange={handleChange} name="company3" />}
						label="puma"
					/>
					<FormControlLabel
						control={<Checkbox value="adidas" checked={company4} onChange={handleChange} name="company4" />}
						label="adidas"
					/>
					<FormControlLabel
						control={<Checkbox value="nike" checked={company5} onChange={handleChange} name="company5" />}
						label="nike"
					/>
				</FormGroup>
			</FormControl>
		</Box>
	);
};

export default withLocalize<Props & LocalizeContextProps>(checkBoxGroupCompany);
