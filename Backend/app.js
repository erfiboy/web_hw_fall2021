import dotenv from 'dotenv';
import express from 'express';
import ParseDashboard from 'parse-dashboard';
import { createServer } from 'http';
import bodyParser from 'body-parser'
import cors from 'cors';
import api from './configserver.js'
import SignUp from './cloud/routers/Signup.js'
import Login from './cloud/routers/Login.js'
import Cart from './cloud/routers/Cart.js'
import UpdateCart from './cloud/routers/UpdateCart.js'

const app = express();
dotenv.config(); // Loads environment variables from .env file

const BookStoreDashboard = () => {
    var options = { allowInsecureHTTP: true };

    var dashboard = new ParseDashboard(
        {
            apps: [
                {
                    serverURL: process.env.PARSE_SERVER_URL,
                    appId: process.env.PARSE_APP_ID,
                    masterKey: process.env.PARSE_MASTER_KEY,
                    appName: process.env.APP_NAME,
                },
            ],
            users: [
                {
                    user: process.env.DASHBOARD_ADMIN,
                    pass: process.env.DASHBOARD_PASS,
                },
            ],
        },
        options
    );

    app.use(process.env.DASHBOARD_PATH, dashboard);
}

const DefineRoles = () => {
    const guest_role = new Parse.ACL();
    const guest = new Parse.Role("Guest", guest_role);
    guest.save();

    const Admin_roles = new Parse.ACL();
    Admin_roles.setPublicWriteAccess(true);
    Admin_roles.setPublicReadAccess(true);
    const admin = new Parse.Role("Authenticated", Admin_roles);
    admin.save();
}

const listen = () => {
    let httpServer = createServer(app);
    httpServer.listen(process.env.PARSE_PORT, () => console.log(`backend running on port ${process.env.PARSE_PORT}.`));
}

const start = () => {
    app.use(cors()); 
    app.use(process.env.SERVER_PATH, api);
    BookStoreDashboard();
    // DefineRoles();
    listen();
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/signup', SignUp);
app.use('/login', Login);
app.use('/cart', Cart);
app.use('/update-cart', UpdateCart);

app.get('/test', function (req, res) {
    res.send("salam");
});

start();