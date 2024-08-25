// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./db/conn');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const cors = require('cors')
// const orderRoutes = require('./routes/orderRoutes');
// const userRoutes = require('./routes/userRoutes');

// dotenv.config();

// connectDB();

// const app = express();
// app.use(cors());

// app.use(express.json());

// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api', orderRoutes);
// app.use('/api/auth', userRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server running on port ${PORT}`));


// server.js
const express = require('express');
const mongoose = require('mongoose');
const authorRoutes = require('./routes/author');
const articleRoutes = require('./routes/article');
const newsletterRoutes = require('./routes/newsletter');
const cors = require('cors');
const connectDB = require('./db/conn');

connectDB();
const app = express();
app.use(express.json()); 
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

// mongoose.connect('mongodb://localhost:27017/blog', { 

// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
app.use('/api/articles', articleRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.listen(5000, () => {
    console.log('Server running on port 5000');
});

