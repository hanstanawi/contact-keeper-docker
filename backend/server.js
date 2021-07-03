const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./config/db');
const app = express();

const usersRoutes = require('./routes/users');
const contactsRoutes = require('./routes/contacts');
const authRoutes = require('./routes/auth');

dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// CORS
app.use(cors());

// Helmet
app.use(helmet());

// Define Routes
app.get('/', (req, res, next) => {
  res.send('Welcome to the Contact Keeper API');
})
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

// Serve static asset in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     path.resolve(__dirname, 'client', 'build', 'index.html');
//   })
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
