/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import './style.scss';
import { withLocalize, LocalizeContextProps } from 'react-localize-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<div>
					<Typography>{children}</Typography>
				</div>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export type Props = {};

const productPageTabs: React.FC<Props & LocalizeContextProps> = (props: Props & LocalizeContextProps) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className="product-tabs-container">
			<div className="tabs-wraper">
				<Tabs
					TabIndicatorProps={{ style: { backgroundColor: '#eeeeee' } }}
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Description" {...a11yProps(0)} />
					<Tab label="Reviews" {...a11yProps(1)} />
					<Tab label="Custom Tab" {...a11yProps(2)} />
					<Tab label="Tags" {...a11yProps(3)} />
					<Tab label="Additional Info" {...a11yProps(4)} />
				</Tabs>
			</div>

			<TabPanel value={value} index={0}>
				{' '}
				Its main purpose is to help visualize the layout and style of a document without the need for actual
				content. purpose, lorem ipsum text doesn’t really mean anything – it is an artificial collection of
				words compiled to give an impression of an intelligent Latin text. Given its intended purpose, lorem
				ipsum text doesn’t really mean anything – it is an artificial collection of words compiled to give an
				impression of an intelligent Latin text.
			</TabPanel>
			<TabPanel value={value} index={1}>
				{' '}
				Given its intended purpose, lorem ipsum text doesn’t really mean anything – it is an artificial
				collection of words compiled to give an impression of an intelligent Latin text. Given its intended
				purpose, lorem ipsum text doesn’t really mean anything – it is an artificial collection of words
				compiled to give an impression of an intelligent Latin text. Given its intended purpose, lorem ipsum
				text doesn’t really mean anything – it is an artificial collection of words compiled to give an
				impression of an intelligent Latin text.
			</TabPanel>
			<TabPanel value={value} index={2}>
				{' '}
				Apart from its use as placeholder text before the real content is at hand, lorem ipsum can also be used
				after the content is available – by temporarily replacing it to separate form from meaning in a design.
				This excercise is sometimes called greeking – not to be confused with geeking 🤓 Given its intended
				purpose, lorem ipsum text doesn’t really mean anything – it is an artificial collection of words
				compiled to give an impression of an intelligent Latin text.
			</TabPanel>
			<TabPanel value={value} index={4}>
				(For the most curious, the original passage means “no one loves pain itself, seeks after it and wants to
				have it, simply because it is pain…”) Given its intended purpose, lorem ipsum text doesn’t really mean
				anything – it is an artificial collection of words compiled to give an impression of an intelligent
				Latin text. Given its intended purpose, lorem ipsum text doesn’t really mean anything – it is an
				artificial collection of words compiled to give an impression of an intelligent Latin text.
			</TabPanel>
			<TabPanel value={value} index={3}>
				{' '}
				Over the years, hundreds of alternative random text styles have sprung up all over the web, ranging from
				quotes from famous people to half-serious varieties based on gangster or pirate speech. Given its
				intended purpose, lorem ipsum text doesn’t really mean anything – it is an artificial collection of
				words compiled to give an impression of an intelligent Latin text. Given its intended purpose, lorem
				ipsum text doesn’t really mean anything – it is an artificial collection of words compiled to give an
				impression of an intelligent Latin text.
			</TabPanel>
		</div>
	);
};

export default withLocalize<Props & LocalizeContextProps>(productPageTabs);
