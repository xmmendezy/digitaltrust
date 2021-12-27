export default {
	production: process.env.PRODUCTION === 'true',
	port: parseInt(process.env.PORT),
	url_root: process.env.URL_ROOT,
	jwt_expiration: parseInt(process.env.JWT_EXPIRATION),
	secret_key: process.env.SECRET_KEY,
	stripe_secret_key: process.env.STRIPE_SECRET_KEY,
	coinpayments_public_key: process.env.COINPAYMENTS_PUBLIC_KEY,
	coinpayments_secret_key: process.env.COINPAYMENTS_SECRET_KEY,
	td: {
		coinbase_secret_key: process.env.TD_COINBASE_SECRET_KEY,
		_4geeks_client_id: process.env.TD_4GEEKS_CLIENT_ID,
		_4geeks_secret_key: process.env.TD_4GEEKS_SECRET_KEY,
		email_notification: process.env.TD_EMAIL_NOTIFICATION,
	},
	email: {
		info: process.env.EMAIL_INFO,
		user: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASSWORD,
	},
};
