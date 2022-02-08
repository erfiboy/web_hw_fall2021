import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const CategoryList = express.Router();

CategoryList.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            const query = new Parse.Query("Category");
            const books = (await query.find({ useMasterKey: true }))
            let response = [];
            books.forEach(element =>{
                response.push({
                    "genre": element.name,
                    "is_available" : true
                })
            })

            res.send(JSON.stringify(response))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default CategoryList;