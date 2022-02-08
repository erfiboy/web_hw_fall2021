import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Cart = express.Router();

Cart.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.query.token)

            const user = Parse.User.current()

            const cart_query = new Parse.Query("Cart");
            cart_query.equalTo("parent", user.id).descending('createdAt');
            const cart = (await cart_query.first({useMasterKey: true}));
            
            const book_query = new Parse.Query("Book");
            book_query.equalTo("parent", cart.id);
            const books = (await book_query.findAll({useMasterKey: true}));

            console.log(books)
            res.send(JSON.stringify(books))
        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default Cart;