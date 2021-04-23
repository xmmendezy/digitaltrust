export default {
	port: parseInt(process.env.PORT),
	url_root: process.env.URL_ROOT,
	jwt_expiration: parseInt(process.env.JWT_EXPIRATION),
	secret_key: process.env.SECRET_KEY,
};
