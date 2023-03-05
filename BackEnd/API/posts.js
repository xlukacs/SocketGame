const express = require('express')
const pool = require('../core/database')
const authenticateToken = require('../core/middleware/isAuthenticated')
const multer = require('multer');
const path = require('path');

const router = express.Router();

var mulStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../publicStorage/attachments/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: mulStorage});

router.post('/newPost', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/newPost/", req.body.post_text, req.user.id);
    var query =     "INSERT INTO posts (poster_id, post_text) VALUES ($1, $2) RETURNING id";

    const postResult = await pool.query(query, [req.user.id, req.body.post_text]);    

    for (let i = 0; i < req.body.attachments.length; i++) {
        const element = req.body.attachments[i];
        var attachmentQuery = "INSERT INTO post_attachments (post_id, url) VALUES ($1, $2)";
        
        await pool.query(attachmentQuery, [postResult.rows[0].id, element.fileName])
    }
    
    res.send(postResult);
})

router.post('/newPost/repost', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/newPost/repost", req.body.reposted_post_id, req.body.post_text, req.user.id);

    var newPostContent = req.body.post_text + ' #post:' + req.body.reposted_post_id;
    var query =     "INSERT INTO posts (poster_id, post_text) VALUES ($1, $2) RETURNING id";
    const repostInsertResult = await pool.query(query, [req.user.id, newPostContent]);

    res.status(200).json({ post_data: { id: repostInsertResult.rows[0].id }});
})

router.get('/getData', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/getData/", req.query.id, req.user.id);
    
    try {
        //General info and content
        var query =     "SELECT " +
                        "posts.post_text AS postContent, users.username AS posterUsername, users.id AS posterId " +
                        "FROM posts " +
                        "JOIN users ON posts.poster_id = users.id " +
                        "WHERE posts.id=$1"
        const postDataResult = await pool.query(query, [req.query.id]);

        //Data per user (like, dislike, reaction, etc...)
        var query =     "SELECT " +
                        "* " +
                        "FROM user_actions " +
                        "WHERE user_actions.value=$1 AND user_actions.user_id=$2 AND user_actions.action='USER_POST_LIKE' AND valid='true'" +
                        "ORDER BY id DESC " +
                        "LIMIT 1" 
        const postActionLikeDataResult = await pool.query(query, [req.query.id, req.user.id]);
        var query =     "SELECT " +
                        "* " +
                        "FROM user_actions " +
                        "WHERE user_actions.value=$1 AND user_actions.user_id=$2 AND user_actions.action='USER_POST_DISLIKE' AND valid='true'" +
                        "ORDER BY id DESC " +
                        "LIMIT 1" 
        const postActionDisLikeDataResult = await pool.query(query, [req.query.id, req.user.id]);


        //Possible attachments
        var query =     "SELECT " +
                        "post_attachments.url AS url, id " +
                        "FROM post_attachments " +
                        "WHERE post_id=$1"
        const postAttachmentsResult = await pool.query(query, [req.query.id]);

        res.status(200).json({generalData: postDataResult.rows, attachments: postAttachmentsResult.rows, reactions: { liked: postActionLikeDataResult.rowCount > 0 ? true : false, disliked: postActionDisLikeDataResult.rowCount > 0 ? true : false}})
    } catch (e) {
        console.log(e);
        res.status(500).send({error:"Cant get post data."})
    }
})

//use multer for multipart/form-data parsing //upload.single('image')
router.post('/uploadAttachment', authenticateToken, upload.any() , async (req, res) => {
    console.log("Got a request in /API/posts/uploadAttachment/", req.user.id);
    //console.log(req.file.filename)
    //console.log(req.body.user_id)
    
    //console.log(req.files)
    
    var attachmentData = {
        message: "",
        attachments: []
    }

    try {
        for (const file of req.files) {   
            var query =     "INSERT INTO " +
                            "user_actions (user_id, action, value) " +
                            "VALUES ($1, $2, $3) RETURNING id";
            const result = await pool.query(query, [req.user.id, 'UPLOAD_TEMP_ATTACHMENT', file.filename]);
            
            attachmentData.attachments.push({
                fileName: file.filename,
                fileId: result.rows[0].id
            })
        }

        attachmentData.message = "Attachment uploaded.";
        res.status(200).json(attachmentData);
    } catch (e) {
        console.log(e);
        attachmentData.message = "Cant get post attachment data.";
        res.status(500).json(attachmentData);
    }
})

router.get('/getAvailablePosts/user', authenticateToken, (req, res) => {
    console.log("Got a request in /API/posts/getAvailablePosts/user", req.query.id);
    //TODO why does this get a user_id??
    var query =     "SELECT id FROM posts WHERE valid = true ORDER BY id DESC";
    pool.query(query).then(retrievedData => {
        console.log("Retrieving posts data")
        res.send(retrievedData);
    })
})

router.post('/actions/like', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/like", req.body.id, req.user.id);
    var query =     "INSERT INTO user_actions(user_id, action, value) VALUES ($1, $2, $3);";

    const result = await pool.query(query, [req.user.id, 'USER_POST_LIKE', req.body.id]);

    res.send(result);
})

router.post('/actions/remove/like', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/remove/like", req.body.id, req.user.id);
    var query =     "UPDATE user_actions SET valid='false' WHERE id=( " +
                    "    SELECT id FROM user_actions WHERE user_id=$2 AND value=$1 AND action='USER_POST_LIKE' " +
                    "    ORDER BY id DESC "+
                    "    LIMIT 1"+
                    ")";

    const result = await pool.query(query, [req.body.id, req.user.id]);

    res.send(result);
})

router.post('/actions/dislike', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/like", req.body.id, req.user.id);
    var query =     "INSERT INTO user_actions(user_id, action, value) VALUES ($1, $2, $3);";
    
    const result = await pool.query(query, [req.user.id, 'USER_POST_DISLIKE', req.body.id]);

    res.send(result);
})

router.post('/actions/remove/dislike', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/remove/dislike", req.body.id, req.user.id);
    var query =     "UPDATE user_actions SET valid='false' WHERE id=( " +
                    "    SELECT id FROM user_actions WHERE user_id=$2 AND value=$1 AND action='USER_POST_DISLIKE' " +
                    "    ORDER BY id DESC "+
                    "    LIMIT 1"+
                    ")";

    const result = await pool.query(query, [req.body.id, req.user.id]);

    res.send(result);
})

router.post('/actions/delete', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/delete", req.body.post_id, req.user.id);

    var query =     "UPDATE posts SET valid = false WHERE id = $1";
    const postDeleteResult = await pool.query(query, [req.body.post_id]);

    var query =     "INSERT INTO user_actions(user_id, action, value) VALUES ($1, $2, $3);";
    const logDeleteResult = await pool.query(query, [req.user.id, 'USER_POST_DELETE', req.body.post_id]);

    res.status(200).json({ status: 'OK' });
})

router.post('/actions/comment', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/comment", req.body.post_id, req.body.comment_text, req.user.id);

    req.app.io.to('user-2-broadcast').emit('send_notification', { type: 'mention', mention_id: 1})//mentionResult.rows[0].id

    var query =     "INSERT INTO comments(post_id, user_id, comment) VALUES ($1, $2, $3) RETURNING id";
    const insertCommentResult = await pool.query(query, [req.body.post_id, req.user.id, req.body.comment_text]);

    res.status(200).json({ status: 'OK', inserted_comment_id: insertCommentResult.rows[0].id });
})

router.post('/actions/insertAttachmentComment', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/actions/insertAttachmentComment", req.body.attachment_id, req.body.comment_text, req.user.id);

    var query =     "INSERT INTO comments(attachment_id, user_id, comment) VALUES ($1, $2, $3) RETURNING id";
    const insertCommentResult = await pool.query(query, [req.body.attachment_id, req.user.id, req.body.comment_text]);

    res.status(200).json({ status: 'OK', inserted_comment_id: insertCommentResult.rows[0].id });
})

router.get('/getComments', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/getComments", req.query.id);

    var query =     "SELECT id, comment, user_id, (NOW() - inserted_at) AS ago FROM comments WHERE post_id = $1";
    const commentsResult = await pool.query(query, [req.query.id]);

    res.status(200).json({ comments: commentsResult.rows });
})

router.get('/attachments/getComments', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/attachments/getComments", req.query.id);

    var query =     "SELECT id, comment, user_id, (NOW() - inserted_at) AS ago FROM comments WHERE attachment_id = $1";
    const commentsResult = await pool.query(query, [req.query.id]);

    res.status(200).json({ comments: commentsResult.rows });
})

router.post('/attachments/actions/like', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/attachments/actions/like", req.body.attachment_id, req.user.id);
    var query =     "INSERT INTO user_actions(user_id, action, value) VALUES ($1, $2, $3);";

    const insertResult = await pool.query(query, [req.user.id, 'USER_ATTACHMENT_LIKE', req.body.attachment_id]);

    res.status(200).json({ status: 'OK' });
})

router.post('/attachments/actions/remove/like', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/attachments/actions/remove/like", req.body.attachment_id, req.user.id);
    var query =     "UPDATE user_actions SET valid='false' WHERE id=( " +
                    "    SELECT id FROM user_actions WHERE user_id=$2 AND value=$1 AND action='USER_ATTACHMENT_LIKE' " +
                    "    ORDER BY id DESC "+
                    "    LIMIT 1"+
                    ")";

    const removeResult = await pool.query(query, [req.body.attachment_id, req.user.id]);

    res.status(200).json({ status: 'OK' });
})

router.post('/attachments/actions/disLike', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/attachments/actions/disLike", req.body.attachment_id, req.user.id);
    var query =     "INSERT INTO user_actions(user_id, action, value) VALUES ($1, $2, $3);";

    const insertResult = await pool.query(query, [req.user.id, 'USER_ATTACHMENT_DISLIKE', req.body.attachment_id]);

    res.status(200).json({ status: 'OK' });
})

router.post('/attachments/actions/remove/disLike', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/attachments/actions/remove/disLike", req.body.attachment_id, req.user.id);
    var query =     "UPDATE user_actions SET valid='false' WHERE id=( " +
                    "    SELECT id FROM user_actions WHERE user_id=$2 AND value=$1 AND action='USER_ATTACHMENT_DISLIKE' " +
                    "    ORDER BY id DESC "+
                    "    LIMIT 1"+
                    ")";

    const removeResult = await pool.query(query, [req.body.attachment_id, req.user.id]);

    res.status(200).json({ status: 'OK' });
})

router.get('/attachments/getReactions', authenticateToken, async (req, res) => {
    console.log("Got a request in /API/posts/attachments/getReactions", req.query.id);

    //Data per user (like, dislike)
    var query =     "SELECT " +
                    "* " +
                    "FROM user_actions " +
                    "WHERE user_actions.value=$1 AND user_actions.user_id=$2 AND user_actions.action='USER_ATTACHMENT_LIKE' AND valid='true'" +
                    "ORDER BY id DESC " +
                    "LIMIT 1" 
    const postActionLikeDataResult = await pool.query(query, [req.query.id, req.user.id]);

    var query =     "SELECT " +
                    "* " +
                    "FROM user_actions " +
                    "WHERE user_actions.value=$1 AND user_actions.user_id=$2 AND user_actions.action='USER_ATTACHMENT_DISLIKE' AND valid='true'" +
                    "ORDER BY id DESC " +
                    "LIMIT 1" 
    const postActionDisLikeDataResult = await pool.query(query, [req.query.id, req.user.id]);

    res.status(200).json({ reactions: {
        isLiked: postActionLikeDataResult.rowCount > 0 ? true : false,
        isDisLiked: postActionDisLikeDataResult.rowCount > 0 ? true : false
    } });
})

module.exports = router;