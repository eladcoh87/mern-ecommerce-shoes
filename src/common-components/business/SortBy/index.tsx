import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './style.scss';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';

export type Props = {
	onSortChange: (sortBy: string) => void;
};

const sortBy: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [sortMethod, setSortMethod] = React.useState('Alphabet_a_to_z');

	const handleChange = (event: SelectChangeEvent) => {
		const { onSortChange } = props;
		setSortMethod(event.target.value);
		onSortChange(event.target.value);
	};
	return (
		<div className="sort-by-container">
			<FormControl className="form-wraper">
				<Select
					className="sort-by-select"
					value={sortMethod}
					onChange={handleChange}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem className="sort-by-menu-item" value="Alphabet_a_to_z">
						Alphabet, a-z
					</MenuItem>
					<MenuItem className="sort-by-menu-item" value="Alphabet_z_to_a">
						Alphabet, z-a
					</MenuItem>
					<MenuItem className="sort-by-menu-item" value="Price_low_to_high">
						Price, low to high
					</MenuItem>
					<MenuItem className="sort-by-menu-item" value="Price_high_to_low">
						Price, high to low
					</MenuItem>
					<MenuItem className="sort-by-menu-item" value="Date_new_to_old">
						Date, new to old
					</MenuItem>
					<MenuItem className="sort-by-menu-item" value="Date_old_to_new">
						Date, old to new
					</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(sortBy);
