import React from 'react';
import { Center, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { isSameDay, isBefore } from 'date-fns';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { IOrderList, IProductList, IProduct } from '../../types';
import Button from '../Button';
import { OrderDetails } from '../OrderDetails';

const today: Date = new Date();
today.setHours(0, 0, 0, 0);

function getDateRange(zeroDate = today, prev = 10, next = 20): Date[] {
	let previousDates = [];
	let nextDates = [];

	for (let i = prev; i > 0; i--) {
		const newDate = new Date();
		newDate.setHours(0, 0, 0, 0);
		newDate.setDate(zeroDate.getDate() - i);
		previousDates.push(newDate);
	}

	for (let i = 1; i <= next; i++) {
		const newDate = new Date();
		newDate.setHours(0, 0, 0, 0);
		newDate.setDate(zeroDate.getDate() + i);
		nextDates.push(newDate);
	}

	return [...previousDates, zeroDate, ...nextDates];
}

const getProductStockForDate = (product: IProduct, orderList: IOrderList, date: Date) => {
	return orderList
		.filter((order) => isBefore(order.dueDate.toDate(), date))
		.reduce((sum, curr) => {
			return curr.products
				.filter((productOrder) => productOrder.id === product.id)
				.reduce((productOrderSum, productOrder) => {
					return productOrderSum - productOrder.qty;
				}, sum);
		}, product.qty);
};

interface IStockScheduleProps {
	productList: IProductList;
	orderList: IOrderList;
	zeroDate?: Date;
	prevDates?: number;
	futureDates?: number;
}
export const StockSchedule: React.FC<IStockScheduleProps> = ({ productList, orderList, zeroDate = today, prevDates = 5, futureDates = 10 }) => {
	const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
	const dateRange = React.useMemo(() => {
		return getDateRange(zeroDate, prevDates, futureDates);
	}, [zeroDate, prevDates, futureDates]);
	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Stock</Th>
					{dateRange.map((date) => (
						<Th key={date.toISOString()}>{date.toLocaleDateString('es-ES')}</Th>
					))}
				</Tr>
			</Thead>
			<Tbody>
				{productList.map((product) => (
					<Tr key={product.id}>
						<Th>{product.displayName}</Th>
						{dateRange.map((date) => {
							const scheduledStock = getProductStockForDate(product, orderList, date);
							const ordersForDate = orderList.filter((order) => isSameDay(order.dueDate.toDate(), date));
							const dateHasOrders = ordersForDate.length > 0;
							return (
								<Td key={date.toISOString()}>
									{dateHasOrders ? (
										<>
											<Center>
												<Button
													onClick={() => setSelectedDate(date.toString())}
													fontSize="xs"
													fontWeight="bold"
													color={scheduledStock < 10 ? 'red' : 'purple.300'}
												>
													{scheduledStock}
												</Button>
											</Center>
											<Modal isOpen={selectedDate === date.toString()} onClose={() => setSelectedDate(null)}>
												<ModalOverlay />
												<ModalContent>
													<ModalHeader>{date.toLocaleDateString('ES-es')}</ModalHeader>
													<ModalCloseButton />
													<ModalBody>
														<OrderDetails orders={ordersForDate} />
													</ModalBody>
												</ModalContent>
											</Modal>
										</>
									) : (
										<Center>
											<Text fontSize="xs" fontWeight="bold" color={scheduledStock < 10 ? 'red' : 'purple.300'}>
												{scheduledStock}
											</Text>
										</Center>
									)}
								</Td>
							);
						})}
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export * from '../../types';
