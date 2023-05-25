const express = require('express')
const pool = require('../core/database')
const authenticateToken = require('../core/middleware/isAuthenticated')
const router = express.Router();

router.post('/getItems', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/items/getItems", req.user.id);
    var query = "INSERT INTO public.users( " +
                "username, password, email) " +
                "VALUES ($1, $2, $3);"

    const registerResult = await pool.query(query, [req.body.username, req.body.password, req.body.email])

    res.status(200).json({ registerResult: registerResult })
})



module.exports = router;