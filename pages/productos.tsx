import { firebase } from '../firebase';
import { Box, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';
import { withFirestore, FirestoreCollection } from 'react-firestore';
import { ProductList, IProductListImperativeHandle } from '../components/ProductList';
import { SidebarWrapperWithPadding } from '../components/Sidebar';
import VisuallyHidden from '@chakra-ui/visually-hidden';
import { IProductFirestoreModel } from '../services/stockService';

interface IProductsProps {
	firestore: firebase.firestore.Firestore;
}
const Productos: React.FC<IProductsProps> = ({ firestore }) => {
	const productListRef = React.createRef<IProductListImperativeHandle>();
	const getProductRef = (productId: string) => firestore.collection('products').doc(productId);
	const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();
	const productAvailableQtyChangedHandler = (productId: string, qtyAvailable: number) =>
		getProductRef(productId).update({ qtyAvailable, updatedAt: getTimestamp() });
	const productCategoryChangedHandler = (productId: string, categoryId: string) => getProductRef(productId).update({ categoryId, updatedAt: getTimestamp() });
	const productDisplayNameChangedHandler = (productId: string, displayName: string) =>
		getProductRef(productId).update({ displayName, updatedAt: getTimestamp() });
	const productDeleteHandler = (productId: string) => getProductRef(productId).delete();

	const productCreatedHandler = async () => {
		const categoryQuerySnapshot = await firestore.collection('categories').where('categoryDisplayName', '!=', '').limit(1).get();
		const categoryDisplayName = categoryQuerySnapshot.empty ? '' : categoryQuerySnapshot.docs[0].data().categoryDisplayName;
		await firestore.collection('products').add({
			categoryDisplayName,
			displayName: '',
			qtyAvailable: 1,
			updatedAt: getTimestamp(),
			createdAt: getTimestamp(),
		} as IProductFirestoreModel);

		productListRef.current?.focusOnLastInput();
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
									sort="createdAt:asc"
									render={({ isLoadingProducts, data: productsCollection }) => {
										if (isLoadingCategories || isLoadingProducts) {
											return <VisuallyHidden as="p">Loading</VisuallyHidden>;
										}
										return (
											<ProductList
												ref={productListRef}
												products={productsCollection}
												categories={categoriesCollection}
												onProductAvailableQtyChange={productAvailableQtyChangedHandler}
												onProductCategoryChange={productCategoryChangedHandler}
												onProductDisplayNameChange={productDisplayNameChangedHandler}
												onProductCreate={productCreatedHandler}
												onProductDelete={productDeleteHandler}
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
