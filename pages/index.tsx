import React from 'react';
import Head from 'next/head';
import { Flex } from '@chakra-ui/layout';
import { MainButton } from '../components/Button';
import { firebase, firebaseAuth } from '../firebase';

export default function Home() {
	const [isLoginIn, setIsLoginIn] = React.useState(false);
	function login() {
		setIsLoginIn(true);
		const provider = new firebase.auth.GoogleAuthProvider();
		firebaseAuth
			.signInWithPopup(provider)
			.then(() => setIsLoginIn(false))
			.catch(() => setIsLoginIn(false));
	}

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
				<MainButton onClick={login} disabled={isLoginIn}>
					Login
				</MainButton>
			</Flex>
		</>
	);
}
