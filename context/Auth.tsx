import React from 'react';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { firebaseAuth } from '../firebase';
import { FullPageLoader } from '../components/FullPageLoader';

type AuthUser = firebase.User;
type MaybeAuthUser = AuthUser | null;

enum Status {
	Pending = 'PENDING',
	Success = 'SUCCESS',
	Error = 'ERROR',
}

interface AuthContextValue {
	user: MaybeAuthUser;
	setUser: React.Dispatch<MaybeAuthUser>;
	login: () => Promise<firebase.auth.UserCredential>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
	undefined
);

export const AuthProvider: React.FC = ({ children }) => {
	const [status, setStatus] = React.useState<Status>(Status.Pending);
	const [user, setUser] = React.useState<MaybeAuthUser>(
		() => firebaseAuth?.currentUser || null
	);
	const router = useRouter();
	const login = React.useCallback(async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		return await firebaseAuth.signInWithPopup(provider);
	}, []);

	const values = React.useMemo(
		() => ({
			user,
			setUser,
			login,
		}),
		[user]
	);

	React.useEffect(() => {
		setStatus(Status.Pending);
		const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
			setStatus(Status.Success);
			setUser(firebaseUser);
			if (firebaseUser === null) {
				router.push('/');
			} else {
				router.push('/productos');
			}
		});

		return () => unsubscribe();
	}, []);

	return status === Status.Pending ? (
		<FullPageLoader />
	) : (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const values = React.useContext(AuthContext);
	if (values === undefined) {
		throw new Error('Wrap the component with an AuthProvider');
	}

	return values;
};
