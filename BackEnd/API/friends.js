const express = require('express')
const pool = require('../core/database')
const authenticateToken = require('../core/middleware/isAuthenticated')
const router = express.Router();

router.get('/getAvailableList', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/friends/getAvailableList", req.user.id);
    var query = "SELECT  " +
                "    user_1_id, " +
                "    user_2_id, " +
                "    u1.username AS user_1_username, " +
                "    u2.username AS user_2_username " +
                "FROM  " +
                "    user_relations  " +
                "JOIN users AS u1 ON u1.id = user_relations.user_1_id  " +
                "JOIN users AS u2 ON u2.id = user_relations.user_2_id  " +
                "WHERE  " +
                "    user_1_id=$1 OR  " +
                "    user_2_id=$1 AND  " +
                "    valid='true'";
    
    const userRelationsResult = await pool.query(query, [req.user.id]);
    
    res.status(200).json({ userRelations: userRelationsResult.rows });
})


module.exports = router;