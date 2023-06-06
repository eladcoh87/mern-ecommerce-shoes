/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import SearchProductCard, { Props as SearchProductCardProps } from './index';

export default {
	title: 'Design System/Busniess Components/myComponent',
	component: SearchProductCard,
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof SearchProductCard> = (args) => <SearchProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {

} as SearchProductCardProps;
