import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';
import User from '../models/userModel';



export const protect = AsyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, procces.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (err) {
			res.status(401);
			throw new Error('no auroziaed token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('not autorized no token');
	}
});
