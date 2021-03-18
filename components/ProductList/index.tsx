import React from 'react';
import Button, { MainButton } from '../Button';
import { Box, Input, Select, SimpleGrid, Table, Tbody, Td, Text, Th, Thead, Tr, Wrap } from '@chakra-ui/react';
import { Products, Categories } from '../../services/stockService';

interface IProductListProps {
	products: Products;
	categories: Categories;
	onProductAvailableQtyChange: (productId: string, qty: number) => void;
	onProductCategoryChange: (productId: string, categoryId: string) => void;
	onProductDisplayNameChange: (productId: string, displayName: string) => void;
	onProductCreate: () => void;
	onProductDelete: (productId: string) => void;
}

export interface IProductListImperativeHandle {
	focusOnLastInput: () => void;
}

export const ProductList = React.forwardRef<IProductListImperativeHandle, IProductListProps>(
	({ products, categories, onProductAvailableQtyChange, onProductCategoryChange, onProductDisplayNameChange, onProductCreate, onProductDelete }, ref) => {
		const lastProductNameInputRef = React.createRef<HTMLInputElement>();

		React.useImperativeHandle(ref, () => ({
			focusOnLastInput: () => lastProductNameInputRef.current?.focus(),
		}));

		return (
			<Box as="section">
				<Table>
					<Thead>
						<Tr>
							<Th textAlign="center">Nombre</Th>
							<Th textAlign="center">Categoria</Th>
							<Th textAlign="center" colSpan={3}>
								{' '}
								Cantidad
							</Th>
							<Th textAlign="center">Borrar</Th>
						</Tr>
					</Thead>
					<Tbody>
						{products.map((product, index) => {
							return (
								<Tr key={product.id}>
									<Td w="60%" textAlign="center">
										<Input
											ref={products.length - 1 === index ? lastProductNameInputRef : undefined}
											variant="filled"
											placeholder="Nombre del producto"
											value={product.displayName}
											onChange={(e) => onProductDisplayNameChange(product.id, e.target.value)}
											isInvalid={product.displayName === ''}
										/>
									</Td>
									<Td w="40%">
										<Select value={product.categoryDisplayName} onChange={(e) => onProductCategoryChange(product.id, e.target.value)}>
											{categories.map((category) => {
												return (
													<option key={category.id} value={category.displayName}>
														{category.displayName}
													</option>
												);
											})}
										</Select>
									</Td>
									<Td textAlign="center">
										<Button size="sm" onClick={() => onProductAvailableQtyChange(product.id, Math.max(product.qtyAvailable - 1, 0))}>
											-
										</Button>
									</Td>
									<Td textAlign="center">
										<Text>{product.qtyAvailable}</Text>
									</Td>
									<Td textAlign="center">
										<Button size="sm" onClick={() => onProductAvailableQtyChange(product.id, product.qtyAvailable + 1)}>
											+
										</Button>
									</Td>
									<Td textAlign="center">
										<Button variant="ghost" colorScheme="red" onClick={() => onProductDelete(product.id)}>
											X
										</Button>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				<Wrap mt="2em" px="2em" justify="flex-end">
					<MainButton my="2em" onClick={onProductCreate}>
						Agregar
					</MainButton>
				</Wrap>
			</Box>
		);
	}
);
