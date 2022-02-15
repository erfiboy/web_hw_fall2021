import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Cart from '../../models/cart.js'

const UpdateCart = express.Router();

UpdateCart.post(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            Parse.User.enableUnsafeCurrentUser()
            await Parse.User.become(req.body.token)
            const user = Parse.User.current()
            console.log("user id = ", user.id)
            
            const cart_query = new Parse.Query("Cart");
            cart_query.equalTo("userId", user.id);
            const cart = (await cart_query.first({useMasterKey: true}));
            console.log("here and cart is :", cart)
            if (cart === undefined) {
                const body = req.body
                Parse.User.enableUnsafeCurrentUser()
                await Parse.User.become(body.token)
                const user = Parse.User.current()
                const cart = new Cart();
                cart.set("userId", user.id)
                const product_list = []
                body.result.forEach(element => {
                    //find books in the database
                    console.log(element)
                    product_list.push(element.id)
                });
                cart.set("productsList", product_list)
                cart.save(null, { useMasterKey: true });
                res.send(JSON.stringify( {"response" : "created successfuly!"}))
            }
            else {
                const body = req.body
                const product_list = []
                body.result.forEach(element => {
                    console.log(element)
                    product_list.push(element.id)
                });
                cart.set("productsList", product_list)
                cart.save(null, { useMasterKey: true });
                res.send(JSON.stringify( {"response" : "added successfuly!"}))
            }
            
        } catch (error) {
            res.send(JSON.stringify( {"error" : error}))
        }
    })
)

export default UpdateCart;