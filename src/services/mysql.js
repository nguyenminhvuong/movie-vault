import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

let conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const mysqlConnect = async () => {
    conn.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL database');
    });
}

const mysqlDisconnect = async () => {
    conn.end((err) => {
        if (err) {
            console.error('Error disconnecting from MySQL:', err);
            return;
        }
        console.log('Disconnected from MySQL database');
    });
}

export { mysqlConnect, mysqlDisconnect, conn };