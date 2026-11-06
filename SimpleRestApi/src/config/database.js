import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; 


dotenv.config();


const url = process.env.MONGODB_URI;

if (!url) {
  console.error("❌ CRITICAL ERROR: MONGODB_URI is not defined inside your secret .env file!");
  process.exit(1);
}

const client = new MongoClient(url);
const dbName = 'SimpleRestApi';
let dbConnection = null;

export async function connectDB() {
  if (dbConnection) return dbConnection;

  try {
    await client.connect();
    console.log('☁️  Successfully connected to MongoDB Atlas Cloud Cluster securely!');
    dbConnection = client.db(dbName);
    return dbConnection;
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error);
    throw error;
  }
}

export function getCollection(collectionName) {
  if (!dbConnection) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return dbConnection.collection(collectionName);
}
