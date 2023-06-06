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
	onPriceChange: (price: any) => void;
};

const checkBoxGroupPrice: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [state, setState] = React.useState({
		price1: false,
		price2: false,
		price3: false,
	});
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { onPriceChange } = props;
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});

		// const priceObj = { ...state, [event.target.name]: event.target.checked };
		onPriceChange(event.target.value);
	};

	const { price1, price2, price3 } = state;

	return (
		<Box className="checkBox-Container" sx={{ display: 'flex' }}>
			<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
				<FormLabel component="legend">
					{' '}
					<h3>PRICE</h3>{' '}
				</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox value="0-300" checked={price1} onChange={handleChange} name="price1" />}
						label="$0 - $300"
					/>
					<FormControlLabel
						control={<Checkbox value="300-450" checked={price2} onChange={handleChange} name="price2" />}
						label="$300 - $450"
					/>
					<FormControlLabel
						control={<Checkbox value="450-3500" checked={price3} onChange={handleChange} name="price3" />}
						label="Above $450"
					/>
				</FormGroup>
			</FormControl>
		</Box>
	);
};

export default withLocalize<Props & LocalizeContextProps>(checkBoxGroupPrice);
