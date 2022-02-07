import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Cart = express.Router();

Cart.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const token = req.query.token;
            const user = await Parse.User.logInWith()
            res.send(user.id)
        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default Cart;