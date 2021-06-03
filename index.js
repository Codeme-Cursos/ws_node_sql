const express = require('express');
const http = require('http');
const { Pool } = require('pg')
const app = express();
const server = http.createServer(app);
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, PORT } = process.env;

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Página de inicio');
})

app.get('/users', async (req, res) => {
    const data = await pool.query('SELECT * FROM users')
    console.log(data.rows)
    return res.json(data.rows)
})

app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    const responseId = await pool.query(`SELECT max(id) AS id FROM users`);
    const { id } = responseId.rows[0];
    const data = await pool.query(`INSERT INTO users VALUES ('${id + 1}', '${name}', '${email}')`);
    return res.json(data)
})

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});