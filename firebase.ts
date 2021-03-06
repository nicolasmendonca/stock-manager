import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseAuth: firebase.auth.Auth;
let firestoreClient: firebase.firestore.Firestore;

const isBrowser = global.window && global.navigator;

if (isBrowser && !firebase.apps.length) {
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_APP_ID,
		measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
	});
}

if (isBrowser) {
	firebase.analytics();
	firebaseAuth = firebase.auth();
	firestoreClient = firebase.firestore();
}

export { firebase, firebaseAuth, firestoreClient };
