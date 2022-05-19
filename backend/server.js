const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000

const app = express();
const version = 'v1'

app.get('/', (req, res) => {
  res.status(200).json({message : 'Welcome to Support System API'})
})
// User Routes
app.use(`/api/${version}/users`, require('./routes/userRoutes'))

app.listen(PORT, () => console.log("Server running on port " + PORT));


console.log("Server started..");