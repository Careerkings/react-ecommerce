import Stripe from 'stripe'
import { STRIPE_KEY } from '../env.js';

const stripe = Stripe(STRIPE_KEY);



export const stripeRouter = async (req, res) => { 
   const line_items = req.body
   console.log(line_items) 
     line_items.map((line_item) => (
         {  
            pricedata: {
                name: line_item.name,
                images: [line_item.image],
                description: line_item.desc,
                metadata: {
                    id: line_item.id
                },
                unit_amount: line_item.price * 100
            },
            quantity: line_item.quantity,
          }

     ))
        
    const session = stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `http://localhost/3000/checkout`,
      cancel_url: `http://localhost/3000/cart`,
    })
    console.log(session)
    res.send({url: session.url})
  }