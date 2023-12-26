import chatModel from './models/messages.model.js';
import { __dirname } from "../utils.js";

export default class ChatManager{
    static get(query){
        return chatModel.find(query);
    }

    static async create(data){
        try {
            const message = await chatModel.create(data);
            console.log('Message created successfully ✅');
            return message;
        } catch (error) {
            console.log(error);
            throw new Error('Error creating message❌');
        }
        
    }
}