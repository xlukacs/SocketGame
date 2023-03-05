const express = require('express')
const pool = require('../core/database')
const authenticateToken = require('../core/middleware/isAuthenticated')
const router = express.Router();

router.get('/getData', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/users/getData", req.query.id);

    var query = 'SELECT username FROM users WHERE id=$1';
    const basicInfoResult = await pool.query(query, [req.query.id]);
    
    var query = 'SELECT * FROM user_actions WHERE id=$1 ORDER BY id DESC LIMIT 1';
    const statusResult = await pool.query(query, [req.query.id]);

    var statusParsedRes = statusResult.rowCount > 0 ? statusResult.rows[0].value : 'offline';

    res.status(200).json({ basic_info: basicInfoResult.rows, availability: statusParsedRes });
})

router.post('/sendFriendRequest', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/users/sendFriendRequest", req.user.id, req.body.user_id);
    var query = "   INSERT INTO public.user_actions( " +
                "   user_id, action, value)" +
                "   VALUES ($1, $2, $3);";

    const friendRequestResult = await pool.query(query, [req.user.id, 'FRIEND_REQUEST', req.body.user_id])

    res.status(200).json({ status: 'OK' })
})


router.get('/getNotificationData', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getNotificationData", req.query.notification_id);
    
    var query = "SELECT user_id AS requester_id, (NOW() - inserted_at) AS ago FROM user_actions WHERE id = $1";
    const notificationDataResult = await pool.query(query, [req.query.notification_id]);

    var query = "SELECT users.username FROM users JOIN user_actions ON user_actions.user_id = users.id WHERE user_actions.id = $1";
    const senderDataResult = await pool.query(query, [req.query.notification_id]);
    
    res.status(200).json({ sender_data: senderDataResult.rows, notification_data: notificationDataResult.rows });
})

router.post('/acceptFriendRequest', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/users/acceptFriendRequest", req.user.id, req.body.user_id);
    var query = "   INSERT INTO public.user_relations( " +
                "   user_1_id, user_2_id)" +
                "   VALUES ($1, $2);";

    const friendAcceptRequest = await pool.query(query, [req.user.id, req.body.friend_id])
    
    var query = "   INSERT INTO public.user_actions( " +
                "   user_id, action, value)" +
                "   VALUES ($1, 'FRIEND_REQUEST_DENY', $2);";
    const logAcceptRequestResult = await pool.query(query, [req.user.id, req.body.friend_id])

    res.status(200).json({ status: 'OK' })
})

router.post('/declineFriendRequest', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/users/declineFriendRequest", req.user.id, req.body.user_id);
    var query = "UPDATE user_actions SET valid = false WHERE user_id = $1 AND value = $2 AND action = 'FRIEND_REQUEST_DENY'";
    const friendDenyRequest = await pool.query(query, [req.body.friend_id, req.user.id])

    //THIS IS FOR FRIEND DELETE OPERATION
    //var query = "UPDATE user_relations SET valid = false WHERE (user_1_id = $1 AND user_2_id = $2) OR (user_1_id = $2 AND user_1_id = $1)";
    //const friendDeleteRequest = await pool.query(query, [req.user.id, req.body.friend_id])

    res.status(200).json({ status: 'OK' })
})

module.exports = router;