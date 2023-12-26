import { Router } from "express";

import UserModel from "../../dao/models/user.model.js";

const router = Router();

//GET
router.get('/user', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/user/:uid', async (req, res) => {
    const { uid } = req.params; 
    try {
        const user = await UserModel.findById(uid); //uso findOne porque find me lo trae como un arreglo y yo quiero un objeto
        if(!user){
            return res.status(404).json({ message: 'User id not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
  });

//POST
router.post('/user', async (req, res) => {
    try {
        const { body } = req;
        const user = await UserModel.create(body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//PUT
router.put('/user/:uid', async (req, res) => {
    const { uid } = req.params;
    const { body } = req;
    const result = await UserModel.updateOne({ _id: uid }, { $set: body });
    res.status(204).end();
});

//DELETE
router.delete('/user/:uid', async (req, res) => {
    const { uid } = req.params;
    const result = await UserModel.deleteOne({ _id: uid });
    res.status(204).end();
});

export default router;