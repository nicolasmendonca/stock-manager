import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { AuthProvider } from '../context/Auth';
import { FirestoreProvider } from 'react-firestore';
import { firebase } from '../firebase';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<FirestoreProvider firebase={firebase}>
					<Component {...pageProps} />
				</FirestoreProvider>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
