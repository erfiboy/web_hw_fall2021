import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Login = express.Router();
Login.get(
    '/',
    expressAsyncHandler( async (req,res) => {
        try {
            const user = await Parse.User.logIn(req.query.username, req.query.password);
            res.send("success and id = " + user.getSessionToken())
        } catch (error) {
            res.send('error: ' + error)
        }
    })
)

export default Login;