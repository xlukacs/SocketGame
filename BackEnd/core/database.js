const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.database_username,
    host: process.env.database_host,
    database: process.env.database_database,
    password: process.env.database_password,
    dialect: 'postgres',
    port: process.env.database_port
});

 
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

module.exports = pool