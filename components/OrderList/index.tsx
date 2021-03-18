import { Accordion, AccordionButton, AccordionItem, AccordionPanel, CloseButton, List, ListItem, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IOrderFirestoreModel } from '../../services/stockService';

interface IOrderListProps {
	orders: IOrderFirestoreModel[];
}
export const OrderList: React.FC<IOrderListProps> = ({ orders }) => {
	console.warn(orders);
	return (
		<Accordion colorScheme="purple" allowMultiple={true}>
			{orders.map((order) => (
				<AccordionItem key={order.id} mb="1em">
					<AccordionButton _expanded={{ bg: 'purple.400', color: 'white' }}>
						<Stack w="full" direction="row" justify="space-between">
							<Text>
								{order.dueDate.toDate().toLocaleDateString()} - {order.customerDetails.fullName}
							</Text>
							<CloseButton />
						</Stack>
					</AccordionButton>
					<AccordionPanel bg="purple.100">
						<List>
							{order.products.map((product) => (
								<ListItem key={product.productId}>
									{product.qty} - {product.productDisplayName} ({product.notes})
								</ListItem>
							))}
						</List>
					</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	);
};
