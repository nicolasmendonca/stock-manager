import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import { FullPageLoader } from './index';

export default {
	title: 'FullPageLoader',
	component: FullPageLoader,
	parameters: {
		jest: ['FullPageLoader/component.test.tsx'],
	},
} as Meta;

export const Primary = () => <FullPageLoader />;
