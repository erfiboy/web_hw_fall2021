import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../../models/category.js'

const CategoryCreate = express.Router();

CategoryCreate.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            // TODO names should be unique
            const name = req.query.name;
            const category = new Category();
            category.set("name", name);
            category.save(null, { useMasterKey: true })

            res.send(JSON.stringify({"status": "ok"}))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default CategoryCreate;