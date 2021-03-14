import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { Box, Flex, Container } from '@chakra-ui/react';

import Button, { MainButton } from '../components/Button';

export default {
	title: 'Button',
	component: Button,
	parameters: {
		jest: ['Button/component.test.tsx'],
	},
} as Meta;

export const basic = () => (
	<Container width="full">
		<Flex justify="space-evenly">
			<Box>
				<Button
					onClick={() => {
						alert('hello');
					}}
				>
					Button
				</Button>
			</Box>
			<Box>
				<MainButton
					onClick={() => {
						alert('hello');
					}}
				>
					MainButton
				</MainButton>
			</Box>
		</Flex>
	</Container>
);
