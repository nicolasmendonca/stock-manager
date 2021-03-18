import { firebase } from '../firebase';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';
import { withFirestore, FirestoreCollection } from 'react-firestore';
import { ProductList, IProductListImperativeHandle } from '../components/ProductList';
import { SidebarWrapperWithPadding } from '../components/Sidebar';
import { IProductFirestoreModel } from '../services/stockService';
import { Skeleton } from '@chakra-ui/skeleton';

interface IProductsProps {
	firestore: firebase.firestore.Firestore;
}
const Productos: React.FC<IProductsProps> = ({ firestore }) => {
	const productListRef = React.createRef<IProductListImperativeHandle>();
	const getProductRef = (productId: string) => firestore.collection('products').doc(productId);
	const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();
	const productAvailableQtyChangedHandler = (productId: string, qtyAvailable: number) =>
		getProductRef(productId).update({ qtyAvailable, updatedAt: getTimestamp() });
	const productCategoryChangedHandler = (productId: string, categoryDisplayName: string) =>
		getProductRef(productId).update({ categoryDisplayName, updatedAt: getTimestamp() });
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
					<Heading as="h1" size="3xl" mb="1em">
						Productos
					</Heading>
					<FirestoreCollection
						path="/categories"
						render={({ isLoading: isLoadingCategories, data: categoriesCollection }) => {
							return (
								<FirestoreCollection
									path="/products"
									sort="createdAt:asc"
									render={({ isLoading: isLoadingProducts, data: productsCollection }) => {
										if (isLoadingCategories || isLoadingProducts) {
											return (
												<Stack spacing={8} p="2em">
													<Skeleton height="30px" />
													<Skeleton height="30px" />
													<Skeleton height="30px" />
												</Stack>
											);
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
