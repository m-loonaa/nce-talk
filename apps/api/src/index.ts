import { PORT } from '#lib/config.ts'
import app from './app.ts'

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
