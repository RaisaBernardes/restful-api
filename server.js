//RESTful API with node.js Express and MongoDB
//rmUiwQQESHCyJKTB
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');
mongoose.set('strictQuery', true) //---ATTENTION HERE

//Routes
const postsRoutes = require('./routes/api/posts');

const app = express();

//BodyParser Middleware
app.use(express.json());

//connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected!!'))
.catch(error => console.log(error));

// User routes
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runs at port ${PORT}`));

