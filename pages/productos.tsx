import { firebase } from '../firebase';
import { Box, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';
import { withFirestore, FirestoreCollection } from 'react-firestore';
import { ProductList } from '../components/ProductList';
import { SidebarWrapperWithPadding } from '../components/Sidebar';
import VisuallyHidden from '@chakra-ui/visually-hidden';
import { IProductFirestoreModel } from '../services/stockService';

interface IProductsProps {
	firestore: firebase.firestore.Firestore;
}
const Productos: React.FC<IProductsProps> = ({ firestore }) => {
	const getProductRef = (productId: string) => firestore.collection('products').doc(productId);
	const productAvailableQtyChangedHandler = (productId: string, qtyAvailable: number) => getProductRef(productId).update({ qtyAvailable });
	const productCategoryChangedHandler = (productId: string, categoryId: string) => getProductRef(productId).update({ categoryId });
	const productDisplayNameChangedHandler = (productId: string, displayName: string) => getProductRef(productId).update({ displayName });

	const productCreatedHandler = async () => {
		const categoryQuerySnapshot = await firestore.collection('categories').where('categoryDisplayName', '!=', '').limit(1).get();
		const categoryDisplayName = categoryQuerySnapshot.empty ? '' : categoryQuerySnapshot.docs[0].data().categoryDisplayName;
		firestore.collection('products').add({
			categoryDisplayName,
			displayName: '',
			qtyAvailable: 1,
		} as IProductFirestoreModel);
	};

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box as="main">
				<SidebarWrapperWithPadding>
					<Heading as="h1" size="3xl" mb="3em">
						Productos
					</Heading>
					<FirestoreCollection
						path="/categories"
						render={({ isLoadingCategories, data: categoriesCollection }) => {
							return (
								<FirestoreCollection
									path="/products"
									render={({ isLoadingProducts, data: productsCollection }) => {
										if (isLoadingCategories || isLoadingProducts) {
											return <VisuallyHidden as="p">Loading</VisuallyHidden>;
										}
										return (
											<ProductList
												products={productsCollection}
												categories={categoriesCollection}
												onProductAvailableQtyChange={productAvailableQtyChangedHandler}
												onProductCategoryChange={productCategoryChangedHandler}
												onProductDisplayNameChange={productDisplayNameChangedHandler}
												onProductCreated={productCreatedHandler}
											/>
										);
									}}
								/>
							);
						}}
					/>
				</SidebarWrapperWithPadding>
			</Box>
		</>
	);
};

export default withFirestore(Productos);
