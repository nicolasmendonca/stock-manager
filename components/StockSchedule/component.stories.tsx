import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { firebase } from '../../firebase';
import { StockSchedule } from './index';
import { IProductList, IOrderList } from '../../types';

const productList: IProductList = [
	{ id: '1', displayName: 'Torta Kyoto', qty: 10 },
	{ id: '2', displayName: 'Muffin', qty: 20 },
	{ id: '3', displayName: 'Chocotorta', qty: 10 },
	{ id: '4', displayName: 'Torta grande', qty: 20 },
	{ id: '5', displayName: 'Torta chica', qty: 10 },
	{ id: '6', displayName: 'Otra torta', qty: 20 },
];

const orderList: IOrderList = [
	{
		id: '1',
		products: [{ id: '1', displayName: 'Torta Kyoto', qty: 20 }],
		dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
		customerDetails: {
			fullName: 'Moni Argento',
		},
	},
	{
		id: '2',
		products: [
			{ id: '1', displayName: 'Torta Kyoto', qty: 5 },
			{ id: '2', displayName: 'Muffin', qty: 15 },
		],
		dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
		customerDetails: {
			fullName: 'Pepe Argento',
		},
	},
];

export default {
	title: 'StockSchedule',
	component: StockSchedule,
	parameters: {},
} as Meta;

export const Default: React.FC = () => {
	return <StockSchedule productList={productList} orderList={orderList} />;
};
