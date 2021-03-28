import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { IOrder } from '../StockSchedule';

interface IOrderDetailsProps {
	orders: IOrder[];
	renderHeader: (order: IOrder) => JSX.Element;
}
type IOrderDetailsPropsWithoutDate = Omit<IOrderDetailsProps, 'renderHeader'>;

export const OrderDetailsSimple: React.FC<IOrderDetailsPropsWithoutDate> = ({ orders }) => {
	return (
		<OrderDetails
			orders={orders}
			renderHeader={(order) => (
				<Box>
					<Text display="inline" fontWeight="bold">
						{order.customerDetails.fullName}
					</Text>
				</Box>
			)}
		/>
	);
};

export const OrderDetailsWithDate: React.FC<IOrderDetailsPropsWithoutDate> = ({ orders }) => {
	return (
		<OrderDetails
			orders={orders}
			renderHeader={(order) => (
				<Box>
					{order.dueDate.toDate().toLocaleDateString('ES-es')}
					{' - '}
					<Text display="inline" fontWeight="bold">
						{order.customerDetails.fullName}
					</Text>
				</Box>
			)}
		/>
	);
};

export const OrderDetails: React.FC<IOrderDetailsProps> = ({ orders, renderHeader }) => {
	return (
		<Box>
			<Accordion allowMultiple>
				{orders.map((order) => {
					return (
						<AccordionItem key={order.id}>
							<AccordionButton>{renderHeader(order)}</AccordionButton>
							<AccordionPanel>
								<List>
									{order.products.map((product) => {
										return (
											<ListItem key={product.id}>
												<Text fontWeight="bold" display="inline">
													{product.displayName}
												</Text>
												{' - '}
												{product.qty} unidades
											</ListItem>
										);
									})}
								</List>
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Box>
	);
};
