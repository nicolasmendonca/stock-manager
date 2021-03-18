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
	onProductCreated: () => void;
}

export const ProductList: React.FC<IProductListProps> = ({
	products,
	categories,
	onProductAvailableQtyChange,
	onProductCategoryChange,
	onProductDisplayNameChange,
	onProductCreated,
}) => {
	return (
		<Box as="section">
			<Table>
				<Thead>
					<Tr>
						<Th textAlign="center" textAlign="center">
							Nombre
						</Th>
						<Th textAlign="center" textAlign="center">
							Categoria
						</Th>
						<Th textAlign="center" colSpan={3}>
							{' '}
							Cantidad
						</Th>
						<Th textAlign="center" textAlign="center">
							Borrar
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{products.map((product) => {
						return (
							<Tr key={product.id}>
								<Td w="60%" textAlign="center">
									<Input
										variant="filled"
										placeholder="Nombre del producto"
										value={product.displayName}
										onChange={(e) => onProductDisplayNameChange(product.id, e.target.value)}
										isInvalid={product.displayName === ''}
									/>
								</Td>
								<Td w="40%">
									<Select value={product.categoryId} onChange={(e) => onProductCategoryChange(product.id, e.target.value)}>
										{categories.map((category) => {
											return (
												<option key={category.id} value={category.id}>
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
									<Button variant="ghost" colorScheme="red">
										X
									</Button>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
			<Wrap mt="2em" px="2em" justify="flex-end">
				<MainButton my="2em" onClick={onProductCreated}>
					Agregar
				</MainButton>
			</Wrap>
		</Box>
	);
};
