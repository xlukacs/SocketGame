const express = require('express')
const pool = require('../core/database')
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log("Got a request in /API/auth/register", req.body.username, req.body.password);
    var query = "INSERT INTO public.users( " +
                "username, password) " +
                "VALUES ($1, $2);"

    const registerResult = await pool.query(query, [req.body.username, req.body.password])

    res.status(200).json({ registerResult: registerResult })
})

router.post('/login', (req, res) => {
    console.log("Got a request in /API/users/login");
    pool.query('SELECT id, username FROM users WHERE username=$1 AND password=$2', [req.body.username, req.body.password]).then(resultSet => {
        if(resultSet.rowCount == 1){
            const user = { user: resultSet.rows[0] }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

            //console.log("User found, replying", { accessToken: accessToken, user_id: user.user.id })
            res.status(200).json({ accessToken: accessToken, user_id: user.user.id });
        }
        else{
            console.log("User not found, denying")
            res.status(404).send("NULL - no users found")
        }
    })
})

module.exports = router;