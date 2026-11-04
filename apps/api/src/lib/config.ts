process.loadEnvFile('.env')

const PORT = process.env.PORT ?? 8000
const NODE_ENV = process.env.NODE_ENV ?? 'development'
const DATABASE_URL = process.env.DATABASE_URL ?? ''

export { PORT, NODE_ENV, DATABASE_URL }
