import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { OrderDetails, OrderDetailsSimple } from '.';
import { IOrder } from '../../types';
import { firebase } from '../../firebase';

export default {
	title: 'OrderDetails',
	component: OrderDetails,
	parameters: {},
} as Meta;

const orders: IOrder[] = [
	{
		id: '1',
		dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
		products: [
			{ id: '1', displayName: 'Torta Kyoto', qty: 20 },
			{ id: '2', displayName: 'Muffin', qty: 15 },
		],
		customerDetails: {
			fullName: 'Pepe Argento',
		},
	},
	{
		id: '2',
		dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
		products: [
			{ id: '3', displayName: 'Chocotorti', qty: 30 },
			{ id: '1', displayName: 'Muffin', qty: 40 },
		],
		customerDetails: {
			fullName: 'Moni Argento',
		},
	},
];

export const Default: React.FC = () => {
	return <OrderDetailsSimple orders={orders} />;
};
