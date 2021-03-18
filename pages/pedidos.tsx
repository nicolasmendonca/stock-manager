import { Box, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';
import { firebase } from '../firebase';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import { OrderList } from '../components/OrderList';
import { SidebarWrapperWithPadding } from '../components/Sidebar';
import { IOrderFirestoreModel } from '../services/stockService';
import { Spinner } from '@chakra-ui/spinner';

interface IPedidosProps {
	firestore: firebase.firestore.Firestore;
}
export const Pedidos: React.FC<IPedidosProps> = ({ firestore }) => {
	return (
		<>
			<Head>
				<title>Pedidos</title>
			</Head>
			<Box as="main">
				<SidebarWrapperWithPadding>
					<Heading as="h1" size="3xl" mb="1em">
						Pedidos
					</Heading>

					<FirestoreCollection
						path="/orders"
						orderBy="dueDate:asc"
						render={({ isLoading, data: orders }) => (isLoading ? <Spinner /> : <OrderList orders={orders} />)}
					/>
				</SidebarWrapperWithPadding>
			</Box>
		</>
	);
};

export default withFirestore(Pedidos);
