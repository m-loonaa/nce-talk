import morgan from 'morgan'
import { NODE_ENV } from '#lib/config.ts'

const logger = morgan(NODE_ENV === 'development' ? 'dev' : 'combined')

export { logger }
