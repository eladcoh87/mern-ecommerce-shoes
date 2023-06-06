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
	onCategoriesChange: (category: string) => void;
};

const checkBoxGroupCategories: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [state, setState] = React.useState({
		category1: false,
		category2: false,
		category3: false,
		category4: false,
	});
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { onCategoriesChange } = props;
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});

		// const priceObj = { ...state, [event.target.name]: event.target.checked };
		onCategoriesChange(event.target.value);
	};

	const { category1, category2, category3, category4 } = state;

	return (
		<Box className="checkBox-Container" sx={{ display: 'flex' }}>
			<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
				<FormLabel component="legend"> <h3>categorys</h3></FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox value="hiking" checked={category1} onChange={handleChange} name="category1" />
						}
						label="hiking"
					/>
					<FormControlLabel
						control={
							<Checkbox value="football" checked={category2} onChange={handleChange} name="category2" />
						}
						label="football"
					/>
					<FormControlLabel
						control={
							<Checkbox value="running" checked={category3} onChange={handleChange} name="category3" />
						}
						label="running"
					/>
					<FormControlLabel
						control={
							<Checkbox value="basketball" checked={category4} onChange={handleChange} name="category4" />
						}
						label="basketball"
					/>
				</FormGroup>
			</FormControl>
		</Box>
	);
};

export default withLocalize<Props & LocalizeContextProps>(checkBoxGroupCategories);
