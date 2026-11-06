import bcrypt from 'bcryptjs';

let users = [
    {
        id: 1,
        username: 'admin',
        passwordHash: '$2a$10$vD2h704.vP/rS8pLp6X6ee1h.hF9j.h9.TOn7u3p9I9u03i7xVf2G', 
        role: 'admin'
    }
];

class UserModel {
    static async create({ username, password, role = 'user' }) {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            username,
            passwordHash,
            role
        };
        users.push(newUser);
        return { id: newUser.id, username: newUser.username, role: newUser.role };
    }

    static findByUsername(username) {
        return users.find(u => u.username === username);
    }
}

export default UserModel;
