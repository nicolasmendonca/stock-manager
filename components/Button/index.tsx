import React from 'react';
import {
	Button as ChakraButton,
	ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {}

const Button: React.FC<ButtonProps> = (props) => {
	return <ChakraButton {...props} onCli />;
};

export const MainButton: React.FC<ButtonProps> = (props) => {
	return <ChakraButton colorScheme="purple" {...props} />;
};

export default Button;
