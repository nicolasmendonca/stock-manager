import Head from 'next/head';
import React from 'react';
import { useAuth } from '../context/Auth';

const Productos = () => {
	const { user } = useAuth();
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>{user?.displayName}</h1>
		</>
	);
};

export default Productos;
