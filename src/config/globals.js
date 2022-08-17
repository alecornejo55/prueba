require('dotenv').config();

module.exports = {
	MONGO_URI: process.env.MONGO_URI || '',
	MOTOR: process.env.MOTOR || 'mongo',
	PORT: process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080,
	emailAdmin: process.env.EMAIL_ADMIN || '',
	app: {
		persistence: process.env.PERSISTENCE || 'mongo',
	}
}