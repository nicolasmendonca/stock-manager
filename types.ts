import { firebase } from './firebase';

interface ICustomerDetails {
	phoneNumber?: number;
	emailAddress?: string;
	fullName: string;
}

export interface IProduct {
	id: string;
	displayName: string;
	qty: number;
}

export interface IOrder {
	id: string;
	products: IProduct[];
	customerDetails: ICustomerDetails;
	dueDate: firebase.firestore.Timestamp;
}

export type IProductList = IProduct[];
export type IOrderList = IOrder[];
