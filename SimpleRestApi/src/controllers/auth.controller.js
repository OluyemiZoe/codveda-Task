import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'super_secret_temporary_key_123'; 

class AuthController {
    static async signup(req, res) {
        try {
            const { username, password, role } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password fields are required.' });
            }

            const existingUser = UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username is already taken.' });
            }

            const user = await UserModel.create({ username, password, role });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error during registration.' });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = UserModel.findByUsername(username);
            
            if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
                return res.status(401).json({ error: 'Invalid username or password credentials.' });
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ 
                message: 'Login successful', 
                token, 
                user: { username: user.username, role: user.role }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error during login authentication.' });
        }
    }
}

export default AuthController;
