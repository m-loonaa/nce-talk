process.loadEnvFile('.env')

const PORT = process.env.PORT ?? 8000
const NODE_ENV = process.env.NODE_ENV ?? 'development'

export { PORT, NODE_ENV }
