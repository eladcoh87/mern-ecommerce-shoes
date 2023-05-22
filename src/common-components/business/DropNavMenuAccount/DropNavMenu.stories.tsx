/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import DropNavMenu, { Props as DropNavMenuProps } from './index';

export default {
	title: 'Design System/Busniess Components/myComponent',
	component: DropNavMenu,
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof DropNavMenu> = (args) => <DropNavMenu {...args} />;

export const Default = Template.bind({});
Default.args = {

} as DropNavMenuProps;
