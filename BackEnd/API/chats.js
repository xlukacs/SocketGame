const express = require('express')
const pool = require('../core/database')
const authenticateToken = require('../core/middleware/isAuthenticated')
const router = express.Router();

router.get('/getBasicInfo', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getBasicInfo", req.query.conversation_id, req.user.id);
    var query = "SELECT users.username AS username, users.id AS user_id FROM users WHERE id = (SELECT user_id FROM conversation_users WHERE conversation_id = $1 AND user_id != $2)";
    
    const chatPartnerDetailsResult = await pool.query(query, [req.query.conversation_id, req.user.id]);
    
    res.status(200).json({ chatPartnerDetails: chatPartnerDetailsResult.rows });
})

router.get('/getPrivateConversationId', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getPrivateConversationId", req.user.id, req.query.partner_id);
    var query = "SELECT conversation_id FROM ( " +
                "    SELECT conversation_id, ROW_NUMBER() OVER(PARTITION BY conversation_id) FROM ( " +
                "        SELECT  " +
                "            user_id, conversation_id  " +
                "        FROM  " +
                "            conversation_users  " +
                "        WHERE  " +
                "            user_id = $1 OR  " +
                "            user_id = $2 " +
                "    ) AS includedUsersListQuery " +
                ") AS conversationSelectorQuerry  " +
                "WHERE row_number = 2;";
    
    const conversationIdResult = await pool.query(query, [req.user.id, req.query.partner_id]);

    if(conversationIdResult.rowCount == 0){
        var query = "INSERT INTO conversations(private) VALUES ('true') RETURNING id";
        const resId = await pool.query(query, []);

        var query1 = "INSERT INTO conversation_users(user_id, conversation_id) VALUES ($1, $2)";
        var query2 = "INSERT INTO conversation_users(user_id, conversation_id) VALUES ($1, $2)";
        await pool.query(query1, [req.user.id, resId.rows[0].id]);
        await pool.query(query2, [req.query.partner_id, resId.rows[0].id]);

        res.status(200).json({ conversationInfo: resId.rows });
    }else{   
        res.status(200).json({ conversationInfo: conversationIdResult.rows });
    }
})

router.get('/getMessages', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getMessages", req.query.conversation_id);
    var query = "SELECT id AS message_id, content AS message, (NOW() - inserted_at) AS minutesAgo, has_attachment, user_id FROM messages WHERE conversation_id = $1";
    
    const messagesResult = await pool.query(query, [req.query.conversation_id]);
    
    res.status(200).json({ messages: messagesResult.rows });
})

router.post('/sendMessage', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/sendMessage", req.body.message, req.body.conversation_id);
    var query = "INSERT INTO messages (user_id, content, conversation_id) VALUES ($1, $2, $3) RETURNING id";
    
    const messagesResult = await pool.query(query, [req.user.id, req.body.message, req.body.conversation_id]);
    
    res.status(200).json({ status: 'OK', id: messagesResult.rows[0].id });
})

router.get('/getLastContactedList', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getLastContactedList", req.user.id);
    var query = "SELECT DISTINCT * FROM ( " +
                "    SELECT conversations.id FROM conversation_users " +
                "    JOIN conversations ON conversation_users.conversation_id = conversations.id " +
                "    JOIN messages ON messages.conversation_id = conversations.id " +
                "    WHERE conversation_users.user_id = $1 " +
                "    ORDER BY inserted_at DESC " +
                ")resultQuery ";
                
    const lastContactedListResult = await pool.query(query, [req.user.id]);
    
    res.status(200).json({ list: lastContactedListResult.rows });
})

router.get('/getLastNotificationsList', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getLastNotificationsList", req.user.id);
    var query = "SELECT  " +
                "    id, action " +
                "FROM " +
                "    user_actions " +
                "WHERE " +
                "    value = $1 AND  " +
                "    action = 'FRIEND_REQUEST' AND " +
                "    valid = true ";
                
    const lastNotificationListResult = await pool.query(query, [req.user.id]);
    
    res.status(200).json({ list: lastNotificationListResult.rows });
})

router.get('/getLastMessage', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getLastMessage", req.query.conversation_id);
    var query = "SELECT content AS message, (NOW() - inserted_at) AS ago, user_id AS sender_id FROM messages WHERE conversation_id = $1 ORDER BY inserted_at DESC LIMIT 1";
    
    const lastMessageData = await pool.query(query, [req.query.conversation_id]);
    
    res.status(200).json({ last_message: { message: lastMessageData.rows[0].message, ago: lastMessageData.rows[0].ago, sender_id: lastMessageData.rows[0].sender_id }});
})

router.get('/getData', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getData", req.query.conversation_id);
    var query = "SELECT * FROM conversations WHERE id=$1";
    
    const conversationDataResult = await pool.query(query, [req.query.conversation_id]);
    
    res.status(200).json({ conversation_data: { name: conversationDataResult.rows[0].name }});
})

router.get('/getReactions', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/getReactions", req.query.message_id);
    var query = "SELECT DISTINCT reaction_count AS count, reaction FROM ( " +
                "    SELECT MAX(times) OVER (PARTITION BY reaction) AS reaction_count, reaction FROM ( " +
                "        SELECT  " +
                "            ROW_NUMBER() OVER (PARTITION BY reaction) AS times, user_id, reaction  " +
                "        FROM  " +
                "            reactions " +
                "        WHERE " +
                "            message_id = $1 " +
                "    )innerResult " +
                ")outerResult " +
                "ORDER BY count DESC";
    
    const messageReactionsResult = await pool.query(query, [req.query.message_id]);
    
    res.status(200).json({ message_data: messageReactionsResult.rows });
})

router.post('/react', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/chats/react", req.body.message_id, req.user.id, req.body.reaction);
    var query = "INSERT INTO reactions (message_id, user_id, reaction) VALUES ($1, $2, $3)";
    
    const reactionInsertResult = await pool.query(query, [req.body.message_id, req.user.id, req.body.reaction]);
    
    res.status(200).json({ status: 'OK' });
})


module.exports = router;