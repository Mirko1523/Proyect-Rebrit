const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del header

    if (token == null) return res.sendStatus(401); // No se proporciona token

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403); // Token inválido o expirado

        req.user = decoded; // Decodifica el payload y añade la información del usuario a req.user
        console.log('Token decoded:', req.user)
        next();
    });
};

module.exports = authenticateToken;
