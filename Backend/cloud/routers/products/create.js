import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/product.js'
import FindOrCreate from '../category/findOrCreate.js'

const CreateProduct = express.Router();

CreateProduct.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        try {
            const product = new Product();

            if (req.query.name)
                product.set("name", req.query.name);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a name" })
                return
            }

            if (req.query.author)
                product.set("author", req.query.author);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a author" })
                return
            }

            if (req.query.price)
                product.set("price", req.query.price);
            else {
                res.statusCode = 500
                res.send({ "error": "book must have a price" })
                return
            }

            if (req.query.is_available)
                product.set("is_available", req.query.is_available);
            else {
                res.statusCode = 500
                res.send({ "error": "book must set the availability status" })
                return
            }

            if (req.query.category) {
                const id = await FindOrCreate(req.query.category)
                console.log(" id in product is ", id)
                product.set("category", id);
            }
            else {
                res.statusCode = 500
                res.send({ "error": "book must set the category" })
                return
            }

            product.save(null, { useMasterKey: true })

            res.send(JSON.stringify({ "status": "ok" }))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default CreateProduct;