/* eslint-disable react/jsx-wrap-multilines */
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
	onColorsChange: (color: string) => void;
};

const checkBoxGroupColor: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [state, setState] = React.useState({
		color1: false,
		color2: false,
		color3: false,
		color4: false,
	});
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { onColorsChange } = props;
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});

		// const priceObj = { ...state, [event.target.name]: event.target.checked };
		onColorsChange(event.target.value);
	};

	const { color1, color2, color3, color4 } = state;

	return (
		<Box className="checkBox-Container" sx={{ display: 'flex' }}>
			<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
				<FormLabel component="legend">
					<h3>Colors</h3>
				</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								className="black-label"
								value="black"
								checked={color1}
								onChange={handleChange}
								name="color1"
							/>
						}
						label="black"
					/>
					<FormControlLabel
						control={
							<Checkbox
								className="red-label"
								value="red"
								checked={color2}
								onChange={handleChange}
								name="color2"
							/>
						}
						label="red"
					/>
					<FormControlLabel
						control={
							<Checkbox
								className="blue-label"
								value="blue"
								checked={color3}
								onChange={handleChange}
								name="color3"
							/>
						}
						label="blue"
					/>
					<FormControlLabel
						control={
							<Checkbox
								className="green-label"
								value="green"
								checked={color4}
								onChange={handleChange}
								name="color4"
							/>
						}
						label="green"
					/>
				</FormGroup>
			</FormControl>
		</Box>
	);
};

export default withLocalize<Props & LocalizeContextProps>(checkBoxGroupColor);
