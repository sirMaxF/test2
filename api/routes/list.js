import express from 'express';
import bcrypt from 'bcrypt'
import { verifyMiddleware } from '../utils/token.js';
import { ListModel } from '../models/List.js';

export const routerList = express.Router();

//  создание
routerList.post('/', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        const createdMovie = new ListModel(req.body);

        try {
            const savedMovie = await createdMovie.save();
            res.status(201).json(savedMovie)
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json('Позволено только админу')
    }
})



//обновление

routerList.put('/:id', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await ListModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            req.status(200).json(updatedMovie)
        } catch (error) {

        }
    } else {
        res.status(403).json('Позволено только админу')
    }
})

// удаление 

routerList.delete('/:id', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const delMovie = await ListModel.findByIdAndDelete(req.params.id);
            res.status(200).json(delMovie);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    else {
        res.status(403).json('Позволено только админу')
    }
})


// получение всех записей

routerList.get('/', verifyMiddleware, async (req, res) => {
    const type = req.query.type;
    const genre = req.query.genre;
    let list = [];

    try {
        if (type) {
            if (genre) {
                list = await ListModel.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: type, genre: genre } }
                ])
            } else {
                list = await ListModel.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: type } }
                ])
            }

        } else {
            // если не указаны параемтры указываем 10 случайных записей
            list = await ListModel.aggregate([
                { $sample: { size: 10 } }
            ])
        }

        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json(error)
    }
})

// получение одной записи

routerList.get('/:id', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movieOne = await ListModel.findById(req.params.id);
            res.status(200).json(movieOne);
        } catch (error) {

        }
    }

    else {
        res.status(403).json('Позволено только админу')
    }
})

