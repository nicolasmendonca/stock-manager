import React from 'react';
import { Flex, VisuallyHidden } from '@chakra-ui/react';
import ScaleLoader from 'react-spinners/ScaleLoader';

export const FullPageLoader = () => {
	return (
		<Flex
			w="full"
			h="100vh"
			bg="purple.500"
			alignItems="center"
			justifyContent="center"
		>
			<VisuallyHidden aria-live="polite">Loading</VisuallyHidden>
			<ScaleLoader color="white" />
		</Flex>
	);
};
