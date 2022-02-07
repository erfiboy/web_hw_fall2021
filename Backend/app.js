import dotenv from 'dotenv';
import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import { createServer } from 'http';
import cors from 'cors';
import cloudCode from './cloud/main.js';

const app = express();
dotenv.config(); // Loads environment variables from .env file

const CongfigServer = () => {
    const databaseUri = process.env.PARSE_SERVER_DATABASE_URI;

    if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
    }
    const api = new ParseServer({
        // allowOrigin: "*",
        databaseURI: process.env.PARSE_SERVER_DATABASE_URI,

        cloud: cloudCode,

        appId: process.env.PARSE_APP_ID,
        masterKey: process.env.PARSE_MASTER_KEY, // Keep this key secret!
        fileKey: process.env.PARSE_FILE_KEY,
        serverURL: process.env.PARSE_SERVER_URL, // Don't forget to change to https if needed
        publicServerURL: process.env.PARSE_SERVER_URL,

        appName: process.env.APP_NAME,
        // Enable email verification
        verifyUserEmails: false,
        enableAnonymousUsers: false,
        allowClientClassCreation: false,

    });

    app.use(process.env.SERVER_PATH, api);
}

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

const listen = () => {
    let httpServer = createServer(app);
    httpServer.listen(process.env.PARSE_PORT, () => console.log(`backend running on port ${process.env.PARSE_PORT}.`));
}

const start = () => {
    app.use(cors()); 
    CongfigServer();
    BookStoreDashboard();

    listen();
}

app.get('/test', function (req, res) {
    res.send("salam");
});

start();