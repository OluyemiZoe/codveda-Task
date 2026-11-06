import { getCollection } from '../config/database.js';
import { ObjectId } from 'mongodb';

class SavingsModel {
    static async getByUserId(userId) {
        const savingsCollection = getCollection('savings');
        
        
        await savingsCollection.createIndex({ userId: 1 });

        let profile = await savingsCollection.findOne({ userId: new ObjectId(userId) });
        
        if (!profile) {
            profile = {
                userId: new ObjectId(userId),
                balance: 0.0,
                targetGoal: 500.0,
                updatedAt: new Date()
            };
            const result = await savingsCollection.insertOne(profile);
            profile._id = result.insertedId;
        }
        return profile;
    }

    static async addDeposit(userId, amount) {
        const savingsCollection = getCollection('savings');
        return await savingsCollection.findOneAndUpdate(
            { userId: new ObjectId(userId) },
            { 
                $inc: { balance: amount },
                $set: { updatedAt: new Date() }
            },
            { returnDocument: 'after', upsert: true }
        );
    }

    static async updateGoal(userId, target) {
        const savingsCollection = getCollection('savings');
        return await savingsCollection.findOneAndUpdate(
            { userId: new ObjectId(userId) },
            { 
                $set: { targetGoal: target, updatedAt: new Date() } 
            },
            { returnDocument: 'after', upsert: true }
        );
    }
}

export default SavingsModel;
