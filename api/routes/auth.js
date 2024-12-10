import express from 'express';
import { userModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const routerAuth = express.Router();

// регистрация
routerAuth.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
    })


    try {
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_KEY, { expiresIn: '5d' });

        return res.status(201).json({ ...user, token })
    } catch (error) {
        return res.status(500).json(error)
    }
})


// вход

routerAuth.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(403).json('Пользователь не найден')
        }

        const compare = await bcrypt.compare(req.body.password, user.password);

        if (!compare) {
            return res.status(403).json('Неверный пользователь или пароль')
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_KEY, { expiresIn: '5d' })

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, token })

    } catch (error) {
        return res.status(500).json(error)
    }
})

