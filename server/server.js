import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import routes
import productsRoute from './routes/products.js';
import userRoute from './routes/user.js';

app.use('/products', productsRoute);
app.use('/user', userRoute);


// Routes
app.get('/', (req, res) => {
    res.send('This is API Home for MalwareBytes Takehome!')
});

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
},() => {
    console.log('Connected to MongoDB')
});

app.listen(3000);
