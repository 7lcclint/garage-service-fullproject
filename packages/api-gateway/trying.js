const http = require('http');
const mysql = require('mysql');
const express = require('express');

const app = express();

const db = mysql.createConnection({
    host: "34.143.179.46",
    user: "root",
    password: "kornkorn00",
    database: "garages",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID', db.threadId);
});

app.get('/garage-api', (req, res) => {
    res.send('Hello from garage-api!');
});

app.get('/garage-api/reservationsByStatusAccept', (req, res) => {
    const procedureName = 'GetReservationsByStatusAccept';

    db.query(`CALL ${procedureName}`, (err, data) => {
        if (err) {
            console.error('Error executing the stored procedure:', err);
            return res.status(500).json({ error: 'Error calling the stored procedure' });
        }
        res.status(200).json(data[0]);
    });
});



const server = http.createServer(app);

server.listen();
