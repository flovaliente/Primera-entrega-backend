import { Router } from 'express';
import ChatManager from '../../dao/ChatManager.js';

const router = Router();

const chatManager = new ChatManager();

router.get('/messages', async (req, res) => {
    try {
        const messages = await chatManager.get();
        res.render('chat', { messages });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving messages❌');
    }
});

export default router;