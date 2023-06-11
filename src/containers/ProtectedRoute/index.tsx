import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { history } from '@base/features';
import { useToasts } from 'react-toast-notifications';

const ProtectedRoute = ({ children }: any) => {
	const { addToast } = useToasts();
	const user = useSelector((state: any) => state.ecomShoes.loginUserData);

	useEffect(() => {
		if (!user.isLoggedIn) {
			addToast('please sign in', {
				appearance: 'error',
				autoDismiss: true,
			});
			history.push('/login-user');
		}
	}, []);

	return children;
};

export default ProtectedRoute;
