import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '#lib/config.ts'

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.error(err)
    return process.exit(1)
  }
}

export { sequelize, connectToDatabase }
