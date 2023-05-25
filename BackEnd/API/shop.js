const express = require('express')
const pool = require('../core/database')
const jwt = require('jsonwebtoken')
const router = express.Router();


router.post('/getItems', async (req, res) => {
    console.log("Got a request in /API/shop/getItems");
    var query = "SELECT * FROM shop_items;"

    const itemsResult = await pool.query(query, [])

    res.status(200).json({ items: itemsResult })
})


module.exports = router;