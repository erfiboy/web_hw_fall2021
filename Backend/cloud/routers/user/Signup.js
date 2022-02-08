import express, { query } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../../models/user.js'

const SignUp = express.Router();
SignUp.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        const user = new User();
        user.set("username", req.query.username);
        user.set("password", req.query.password);

        // TODO add email verification
        // user.set("email", "email@example.com");
        
        try {
            await user.signUp();
            var query = new Parse.Query(Parse.Role);
            query.equalTo("name", 'Authenticated');
            const role = await query.first({useMasterKey: true});
            role.getUsers().add(user);
            role.save(null, { useMasterKey: true });    
            res.send(JSON.stringify({"success" : user.getSessionToken()}))
        } catch (error) {
            res.send("error " + error)
        }
    })
)

export default SignUp;