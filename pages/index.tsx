import React from 'react';
import Head from 'next/head';
import { Flex } from '@chakra-ui/layout';
import { MainButton } from '../components/Button';
import { useAuth } from '../context/Auth';

export default function Home() {
	const [isLoginIn, setIsLoginIn] = React.useState(false);
	const { login } = useAuth();

	const doLogin = async () => {
		setIsLoginIn(true);
		await login();
		setIsLoginIn(false);
	};

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex
				h="full"
				alignItems="center"
				justifyContent="center"
				style={{ height: '100vh' }}
			>
				<MainButton onClick={doLogin} disabled={isLoginIn}>
					Login
				</MainButton>
			</Flex>
		</>
	);
}
