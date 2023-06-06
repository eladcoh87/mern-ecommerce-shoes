import * as React from 'react';
import './style.scss';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import PresentToAllOutlinedIcon from '@mui/icons-material/PresentToAllOutlined';
import { CartProduct } from 'actions/ecomShoes/interface';
import { useToasts } from 'react-toast-notifications';

export type Props = {
	AddToCart: (cartProductItem: CartProduct) => void;
	productId: string;
	price: number;
	image: string;
	date: Date;
	name: string;
};

const sizeBox: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const { addToast } = useToasts();
	const { AddToCart, productId, price, image, date, name } = props;
	const [sizeValue, setSizeValue] = React.useState('40');
	const [colorValue, setColorValue] = React.useState('red');
	const [qtyValue, setQtyValue] = React.useState(1);

	const handleQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQtyValue(Number(event.target.value));
	};

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setColorValue((event.target as HTMLInputElement).value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSizeValue((event.target as HTMLInputElement).value);
	};

	const handleAddToCart = () => {
		const cartProduct = { productId, size: sizeValue, color: colorValue, qty: qtyValue, price, image, date, name };
		addToast(`${name} add to the cart ✨`, {
			appearance: 'success',
			autoDismiss: true,
		});
		AddToCart(cartProduct);
	};
	return (
		<FormControl>
			<FormLabel id="demo-controlled-radio-buttons-group" />
			<RadioGroup
				aria-labelledby="demo-controlled-radio-buttons-group"
				name="controlled-radio-buttons-group"
				value={sizeValue}
				onChange={handleChange}
			>
				<div className="radio-box-wraper">
					<div className="radio-size-wraper">
						<FormControlLabel className="radio-size-wraper" value="40" control={<Radio />} label="40" />
					</div>

					<div className="radio-size-wraper">
						<FormControlLabel className="radio-size-wraper" value="42" control={<Radio />} label="42" />
					</div>
					<div className="radio-size-wraper">
						<FormControlLabel className="radio-size-wraper" value="44" control={<Radio />} label="44" />
					</div>
				</div>
			</RadioGroup>
			<RadioGroup
				aria-labelledby="demo-controlled-radio-buttons-group"
				name="controlled-radio-buttons-group"
				value={colorValue}
				onChange={handleColorChange}
			>
				<div className="radio-box-wraper radio-color-wraper">
					<div className="radio-size-wraper radio-color-wraper radio-color-red">
						<FormControlLabel
							className="radio-size-wraper radio-color-wraper"
							value="red"
							control={<Radio />}
							label=""
						/>
					</div>

					<div className="radio-size-wraper">
						<FormControlLabel
							className="radio-size-wraper radio-color-wraper radio-color-black"
							value="black"
							control={<Radio />}
							label=""
						/>
					</div>
					<div className="radio-size-wraper">
						<FormControlLabel
							className="radio-size-wraper radio-color-wraper radio-color-green"
							value="green"
							control={<Radio />}
							label=""
						/>
					</div>
					<div className="radio-size-wraper">
						<FormControlLabel
							className="radio-size-wraper radio-color-wraper radio-color-blue"
							value="blue"
							control={<Radio />}
							label=""
						/>
					</div>
				</div>
			</RadioGroup>

			<div className="qty-atc-section-wraper">
				<div className="qty-wraper">
					<p>Qty:</p>
					<div className="number-input-wraper">
						<TextField
							InputProps={{
								inputProps: {
									max: 10,
									min: 1,
								},
							}}
							value={qtyValue}
							onChange={handleQtyChange}
							type="number"
						/>
					</div>
				</div>

				<div className="atc-wraper">
					{' '}
					<Button
						onClick={handleAddToCart}
						className="product-btns atc-btn"
						type="submit"
						variant="contained"
					>
						ADD TO CART
					</Button>
					<Button className="product-btns atw-btn" variant="contained">
						ADD TO WISH LIST
					</Button>
				</div>
			</div>
			<div className="social-box">
				<Button className="facebook" variant="contained">
					<ThumbUpOutlinedIcon /> LIKE
				</Button>
				<Button className="tweeter" variant="contained">
					<FlutterDashIcon /> tweet
				</Button>
				<Button className="share" variant="contained">
					<PresentToAllOutlinedIcon /> share
				</Button>
			</div>
		</FormControl>
	);
};

export default withLocalize<Props & LocalizeContextProps>(sizeBox);
