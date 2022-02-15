import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const List = express.Router();

List.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            const query = new Parse.Query("Product");

            if (req.query.catrgory_id)
                query.equalTo("category", req.query.catrgory_id)
            
            if (req.query.price__lt)
                query.lessThan("price", req.query.price__lt)
                
            if (req.query.price__gt)    
                query.greaterThan("price", req.query.price__gt)

            if (req.query.sort){
                if(req.query.sort == "price-")
                query.descending("price")
                else if(req.query.sort == "price-")
                query.ascending("price")
                if(req.query.sort == "date_updated-")
                query.descending("updatedAt")
                else if(req.query.sort == "date_updated")
                query.ascending("updatedAt")
            }
            
            const books = (await query.find({ useMasterKey: true }))
            console.log("book", books)
            let response = [];
            books.forEach(element =>{
                response.push({
                    "id": element.id,
                    "name": element.attributes.name,
                    "author": element.attributes.author,
                    "price": element.attributes.price,
                    "is_available" : element.attributes.is_available
                    // TODO book price and ...
                })
            })
            const result = {"response" : response}
            res.send(JSON.stringify(result))

        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default List;