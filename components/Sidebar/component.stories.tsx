import { Heading } from '@chakra-ui/layout';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { AuthProvider } from '../../context/Auth';
import { Sidebar, SidebarWrapper, SidebarWrapperWithPadding } from './index';

export default {
	title: 'Sidebar',
	component: Sidebar,
	parameters: {
		jest: ['FullPageLoader/component.test.tsx'],
	},
} as Meta;

const wrapWithAuthProvider = (Component) => () => {
	return (
		<AuthProvider
			checkLoginOnInit={false}
			user={{
				displayName: 'Nicolas Mendonca',
			}}
		>
			<Component />
		</AuthProvider>
	);
};

export const DefaultStory = wrapWithAuthProvider(() => {
	return <Sidebar />;
});

export const SidebarWrapperStory = wrapWithAuthProvider(() => {
	return (
		<SidebarWrapper>
			<Heading>Title</Heading>
		</SidebarWrapper>
	);
});

export const SidebarWrapperWithPaddingStory = wrapWithAuthProvider(() => {
	return (
		<SidebarWrapperWithPadding>
			<Heading>Title</Heading>
		</SidebarWrapperWithPadding>
	);
});
