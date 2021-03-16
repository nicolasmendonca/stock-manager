import React from 'react';
import Link from 'next/link';
import {
	Box,
	Flex,
	List,
	ListItem,
	Spacer,
	Text,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { useAuth } from '../../context/Auth';

interface ILink {
	route: string;
	displayName: string;
}
interface INavLinksProps {
	links: ILink[];
}
const NavLinks: React.FC<INavLinksProps> = ({ links }) => {
	return (
		<List py="20">
			{links.map((link) => (
				<ListItem key={link.route} pt="6">
					<Link href={link.route} as={link.route}>
						<ChakraLink
							_hover={{
								color: 'gray.200',
							}}
							colorScheme="purple"
							fontWeight="semibold"
						>
							{link.displayName}
						</ChakraLink>
					</Link>
				</ListItem>
			))}
		</List>
	);
};

export const Sidebar = () => {
	const { user } = useAuth();
	return (
		<Box as="nav" bg="purple.400" w="xs">
			<Flex
				flexDirection="column"
				alignItems="flex-start"
				justifyContent="flex-end"
				h="100vh"
				p="6"
			>
				<Spacer />
				<Box py="16">
					<NavLinks
						links={[
							{ displayName: 'Productos', route: '/productos' },
							{ displayName: 'Encargos', route: '/encargos' },
							{ displayName: 'Produccion', route: '/produccion' },
						]}
					/>
					<Text color="white" fontWeight="light" letterSpacing="wide">
						{user?.displayName}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};

export const SidebarWrapper: React.FC = ({ children }) => {
	return (
		<Flex maxW="full">
			<Sidebar />
			{children}
		</Flex>
	);
};

export const SidebarWrapperWithPadding: React.FC = ({ children }) => {
	return (
		<SidebarWrapper>
			<Box p="12">{children}</Box>
		</SidebarWrapper>
	);
};
