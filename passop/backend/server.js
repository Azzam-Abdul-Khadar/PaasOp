import express from 'express'
// require('dotenv').config()
import dotenv from 'dotenv';
console.log(process.env.MONGO_URI);
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
