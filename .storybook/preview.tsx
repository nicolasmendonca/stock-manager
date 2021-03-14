import { addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

addDecorator(withTests({ results }));

addDecorator((StoryFn: Function) => (
	<ChakraProvider theme={theme}>
		<StoryFn />
	</ChakraProvider>
));

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};
