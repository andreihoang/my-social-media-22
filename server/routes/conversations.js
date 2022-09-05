const router = require('express').Router();
const Conversation = require('../models/Conversation');


// new converasation

router.post('/', async (req, res) => {
    try{
        const conversation = await Conversation.findOne({
            members: { $all: [req.body.firstUserID, req.body.secondUserId] },
        });
    
        if (conversation) {
            res.status(200).json(conversation);
        } else {
            const newConversation = new Conversation({
                members: [req.body.firstUserID, req.body.secondUserId]
            });
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);

        }
    } catch(err) {
        res.status(500).json(err);
    }
})


// get conversation of a user
router.get('/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        })
        res.status(200).json(conversation);
    }catch(err) {
        res.status(500).json(err);
    }
})

// get conversation of 2 user Id
router.get('/find/:firstUserID/:secondUserId', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserID, req.params.secondUserId] },
        })
        res.status(200).json(conversation);
    }catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;