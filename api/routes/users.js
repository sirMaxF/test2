import express from 'express';
import { userModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import { verifyMiddleware } from '../utils/token.js';

export const routerUser = express.Router();

// обновление
routerUser.put('/:id', verifyMiddleware, async (req, res) => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)

            try {
                const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

                return res.status(200).json(updatedUser)

            } catch (error) {
                return res.status(500).json({ error: error })
            }
        }
    } else {
        return res.status(500).json('Вы можете обновлять только свой аккаунт')
    }

})

// удаление

routerUser.delete('/:id', verifyMiddleware, async (req, res) => {
    if (req.params.id === req.user.id || isAdmin === true) {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id)
            return res.status(200).json('Пользователь удален')
            console.log(user)
        } catch (error) {
            res.status(403).json(error)
        }
    }

    else {
        return res.status(500).json('Удалять можно только свой аккаунт')
    }

})

// получение всех пользователей
routerUser.get('/', verifyMiddleware, async (req, res) => {
    const query = req.query.new;
    console.log(req.user)
    if (req.user.isAdmin == true) {

        try {
            const users = query ? await userModel.find().limit(10) : await userModel.find();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json('Не удалось получить список пользователей')
        }
    } else {
        return res.status(500).json('Доступ ко всему списку пользователей только у админа')
    }
})

//получение одного пользователя

routerUser.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// создание статистики
routerUser.get('/stat/:id', async (req, res) => {
    try {
        const users = await userModel.aggregate([{
            $group: {
                '_id': "$isAdmin",
                count: { $sum: 1 }
            }
        }])
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error)
    }
})