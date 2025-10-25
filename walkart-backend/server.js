import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

//App configuration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) =>{
    res.send('API IS WORKING')
})

app.listen(PORT, () => {
    console.log("SERVER STARTED ON PORT: ", PORT)
})