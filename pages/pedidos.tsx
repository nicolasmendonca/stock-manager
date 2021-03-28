import { Box, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { SidebarWrapperWithPadding } from '../components/Sidebar';
import { Spinner } from '@chakra-ui/spinner';
import { OrderDetailsWithDate } from '../components/OrderDetails';
import { Button } from '@chakra-ui/button';
import { MainButton } from '../components/Button';

export const Pedidos: React.FC = () => {
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
						render={({ isLoading, data: orders }) =>
							isLoading ? (
								<Spinner />
							) : (
								<Box>
									<OrderDetailsWithDate orders={orders} />
									<MainButton size="sm" m="4">
										Crear pedido
									</MainButton>
								</Box>
							)
						}
					/>
				</SidebarWrapperWithPadding>
			</Box>
		</>
	);
};

export default Pedidos;
