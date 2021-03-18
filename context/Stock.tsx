import React from 'react';
import {
	Categories,
	Products,
	fetchProducts,
	fetchCategories,
} from '../services/stockService';

export const StockContext = React.createContext<IUseStock>(undefined);

interface IUseStock {
	fetchCategories: () => Promise<Categories>;
	fetchProducts: () => Promise<Products>;
}

export const useStock = (): IUseStock => {
	const value = React.useContext(StockContext);
	if (value === undefined) {
		throw new Error('Please wrap with StockProvider');
	}
	return value;
};

export const StockProvider: React.FC = ({ children }) => {
	const value: IUseStock = React.useMemo(
		() => ({
			fetchCategories,
			fetchProducts,
		}),
		[]
	);
	return (
		<StockContext.Provider value={value}>{children}</StockContext.Provider>
	);
};
