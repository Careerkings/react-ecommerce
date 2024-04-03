import express from 'express'
import products from './data/product.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import auth from './routes/auth.route.js'
import mongoose from 'mongoose';
import { MONGO } from './env.js';
// import stripe from './routes/stripe.route.js'

const app = express();
app.use(express.json())
app.use(cors())

 
mongoose.connect(MONGO)
.then(() => console.log('connected to db'))
.catch(err => console.log(err.message))


app.get('/products', (req, res) => {
         res.send(products)
         console.log(products)
});

app.use('/api', auth) 
/*
app.use('/api', signin)
app.use('/api', google)
app.use('/api', stripe)*/

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'INTERNAL SERVER ERROR';
    
    return res.status(status).json({
        success: false,
        message,
        status
    })
});


app.listen(5000, () => {
    console.log('port is running at 5000')
})