import express from 'express';
import { movieModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import { verifyMiddleware } from '../utils/token.js';

export const routerMovie = express.Router();

//  создание
routerMovie.post('/', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        const createdMovie = new movieModel(req.body);

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

routerMovie.put('/:id', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            req.status(200).json(updatedMovie)
        } catch (error) {

        }
    } else {
        res.status(403).json('Позволено только админу')
    }
})

// удаление 

routerMovie.delete('/:id', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const delMovie = await movieModel.findByIdAndDelete(req.params.id);
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

routerMovie.get('/', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await movieModel.find();
            res.status(200).json(movies);
        } catch (error) {

        }
    }

    else {
        res.status(403).json('Позволено только админу')
    }
})

// получение одной записи

routerMovie.get('/find/:id', verifyMiddleware, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movieOne = await movieModel.findById(req.params.id);
            res.status(200).json(movieOne);
        } catch (error) {

        }
    }

    else {
        res.status(403).json('Позволено только админу')
    }
})

// получение случайной записи

routerMovie.get('/random', verifyMiddleware, async (req, res) => {
    const query = req.query.type;

    let movie;

    // если запрос вида /random?type=series
    if (query === 'series') {
        try {
            movie = await movieModel.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);

            return res.status(200).json({ movie })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    // если запрос отличен от /random?type=series

    else {
        try {
            movie = await movieModel.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);

            return res.status(200).json({ movie: movie })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }


})


routerMovie.get('/eee', verifyMiddleware, async (req, res) => {
    res.json('gjlgn')
})