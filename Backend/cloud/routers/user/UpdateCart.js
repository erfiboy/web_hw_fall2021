import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Cart from '../../models/cart.js'
import Book from '../../models/book.js'

const UpdateCart = express.Router();

UpdateCart.post(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const body = req.body
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(body.token)
            const user = Parse.User.current()
            const cart = new Cart();
            cart.set("parent", user.id)
            body.result.forEach(element => {
                //find books in the database
                console.log(element)
                const book = new Book();
                book.set("id", element.id);
                book.set("author", element.author);
                book.set("parent", cart);
                book.save(null, { useMasterKey: true });
            });

            cart.save(null, { useMasterKey: true });
            console.log("here")
            res.send("user.id")
        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default UpdateCart;