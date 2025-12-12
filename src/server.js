import http from 'http';
import dotenv from 'dotenv';
import app from '../app.js';
import { mysqlConnect, mysqlDisconnect } from './services/mysql.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
    mysqlConnect();

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();