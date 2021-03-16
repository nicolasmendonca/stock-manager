import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { Sidebar } from './index';

export default {
	title: 'Sidebar',
	component: Sidebar,
	parameters: {
		jest: ['FullPageLoader/component.test.tsx'],
	},
} as Meta;

export const Primary = () => {
	return <Sidebar />;
};
