import { PORT } from '#lib/config.ts'
import app from './app.ts'
import { connectToDatabase } from '#lib/db.ts'

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}

void start()
