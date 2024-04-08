// Import necessary modules
const express = require('express');
const cors = require('cors');
const db = require('./db/config')
const auth = require('./Middlewares/auth')
const route = require('./Controllers/route')
require('dotenv').config()

// Initialize express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.post('/' , auth)


app.use('/api', route);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const DATABASE_URL = process.env.DB_URL
const DATABASE = process.env.DB || 'Cluster0'

db(DATABASE_URL, DATABASE);