import { firebase, firestoreClient } from '../firebase';

export interface ICategoryFirestoreModel {
	displayName: string;
}

export interface IProductFirestoreModel {
	displayName: string;
	categoryDisplayName: string;
	qtyAvailable: number;
}

export interface IProductOrderDetails {
	productId: string;
	productDisplayName: string;
	categoryId: string;
	categoryDisplayName: string;
	qty: number;
	notes?: string;
}

export interface ICustomerDetails {
	fullName: string;
	contactNumber?: string;
	profileUrl?: string;
}

export interface IOrderFirestoreModel {
	id: string;
	products: IProductOrderDetails[];
	customerDetails: ICustomerDetails;
	dueDate: firebase.firestore.Timestamp;
	deliveryAddress: string;
	createdAt: firebase.firestore.Timestamp;
	updatedAt: firebase.firestore.Timestamp;
}

export interface IProduct {
	id: string;
	displayName: string;
	categoryDisplayName: string;
	qtyAvailable: number;
}

export interface ICategory {
	id: string;
	displayName: string;
}

export type Products = IProduct[];
export type Categories = ICategory[];

export function parseFirestoreList<T>(list: any) {
	type ParsedList = T & {
		id: string;
	};

	return list.docs.map((item) => {
		return { id: item.id, ...item.data() } as ParsedList;
	}) as ParsedList[];
}

// function parseProductsFirestoreResponse(
// 	productsResponse: ProductFirestoreResponse
// ): Products {
// 	return productsResponse.map(product => ({
// 		product.id,
// 		categoryDisplayName,
// 		displayName,
// 		qtyAvailable
// 	}))
// }

export const fetchProducts = async (): Promise<Products> => {
	const productsQuery = firestoreClient.collection('products');
	const categoriesQuery = firestoreClient.collection('categories');
	const [products, categories] = await Promise.all([productsQuery.get(), categoriesQuery.get()]);

	const [parsedProducts, parsedCategories] = [parseFirestoreList<IProductFirestoreModel>(products), parseFirestoreList<ICategoryFirestoreModel>(categories)];
	return parsedProducts.map((product) => ({
		categoryDisplayName: parsedCategories.find((cat) => cat.id === product.categoryId)?.displayName,
		...product,
	}));
};

export const fetchCategories = async (): Promise<Categories> => {
	const categoriesList = await firestoreClient.collection('categories').get();
	return parseFirestoreList<ICategoryFirestoreModel>(categoriesList);
};
