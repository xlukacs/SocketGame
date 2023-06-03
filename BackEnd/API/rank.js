const express = require('express')
const pool = require('../core/database')
const authenticateToken = require('../core/middleware/isAuthenticated')
const router = express.Router();

router.get('/getLeaderboard', async (req, res) => {
    console.log("Got a request in /API/rank/getLeaderboard");
    var query = "SELECT username, rankpoints, faction FROM users ORDER BY rankpoints DESC LIMIT 10";

    const leaderboardResult = await pool.query(query)

    res.status(200).json({ 'users': leaderboardResult.rows })
})



module.exports = router;