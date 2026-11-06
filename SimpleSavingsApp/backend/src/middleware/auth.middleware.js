import jwt from 'jsonwebtoken';

export function authenticateGraphQL(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') return null;

    const token = parts[1];
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}
