import { getCollection } from '../config/database.js';

class UserModel {
    static async findByUsername(username) {
        const usersCollection = getCollection('users');
        return await usersCollection.findOne({ username });
    }

    static async create({ username, passwordHash, role }) {
        const usersCollection = getCollection('users');
        
        
        await usersCollection.createIndex({ username: 1 }, { unique: true });

        const newUser = {
            username,
            passwordHash,
            role: role || 'user',
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);
        return {
            id: result.insertedId,
            username: newUser.username,
            role: newUser.role
        };
    }
}

export default UserModel;
