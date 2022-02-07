import dotenv from 'dotenv';
import { ParseServer } from 'parse-server';
import cloudCode from './cloud/main.js';


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

    return api;
}

const api = CongfigServer();

export default api;