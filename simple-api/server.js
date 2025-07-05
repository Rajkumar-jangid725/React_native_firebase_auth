const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
