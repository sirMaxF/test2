import jwt from 'jsonwebtoken';

export const verifyMiddleware = (req, res, next) => {
    const header = req.headers.token;

    if (header) {
        const token = header.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
            if (err) res.status(403).json({ err: err });
            req.user = data;

            next();

            return;
        })
    } else {
        return res.status(500).json('Вы не авторизованы')
    }

}