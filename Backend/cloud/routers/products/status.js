import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';

const Status = express.Router();

Status.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const id = req.query.id
            console.log("id","=", id)
            const query = new Parse.Query("Book");
            const book =  (await query.equalTo("objectId", id).first({ useMasterKey: true })).attributes;
            console.log("book", book)
            const response = {
                "id": id,
                "author": book.author,
                // TODO book price and ...
                "price": 1200,
                "is_available" : true
            }
            res.send(JSON.stringify(response))
        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default Status;