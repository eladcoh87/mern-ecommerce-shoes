/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import SortBy, { Props as SortByProps } from './index';

export default {
	title: 'Design System/Busniess Components/myComponent',
	component: SortBy,
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof SortBy> = (args) => <SortBy {...args} />;

export const Default = Template.bind({});
Default.args = {

} as SortByProps;
