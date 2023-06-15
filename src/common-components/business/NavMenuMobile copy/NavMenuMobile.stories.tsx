/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import NavMenuMobile, { Props as NavMenuMobileProps } from './index';

export default {
	title: 'Design System/Busniess Components/myComponent',
	component: NavMenuMobile,
	argTypes: {

	},
	parameters: { docs: { source: { type: 'dynamic', excludeDecorators: true } } }
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof NavMenuMobile> = (args) => <NavMenuMobile {...args} />;

export const Default = Template.bind({});
Default.args = {

} as NavMenuMobileProps;
