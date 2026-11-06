import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ApolloServer } from '@apollo/server'; // Modern v4 Package
import { expressMiddleware } from '@apollo/server/express4'; // Clean Express bridge
import { connectDB } from './src/config/database.js';
import { typeDefs } from './src/graphql/schema.js';
import { resolvers } from './src/graphql/resolvers.js';
import { authenticateGraphQL } from './src/middleware/auth.middleware.js';
import { initializeSockets } from './src/socket/socket.handler.js';

console.log('Starting Advanced Server Initialization...');

// Dependency assertion checks
if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
    console.error("CRITICAL ERROR: Environment variables missing from .env file!");
    process.exit(1);
}

async function startAdvancedServer() {
    const app = express();
    const httpServer = createServer(app);

    // Dynamic environmental domain evaluation
    const ALLOWED_ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

    // Initializing Real-Time WebSockets Engine with Production-Safe CORS
    const io = new Server(httpServer, {
        cors: { 
            origin: ALLOWED_ORIGIN, 
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    initializeSockets(io);
    app.set('io', io);

    // Initializing Modern GraphQL Apollo Server Engine
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    // starting Apollo Server completely before mounting middleware
    await apolloServer.start();

    // Global Express Production Route Protection Middleware Configuration
    app.use(cors({
        origin: ALLOWED_ORIGIN,
        credentials: true
    }));
    app.use(express.json());

    // Secure GraphQL API Context Router 
    app.use(
        '/graphql',
        expressMiddleware(apolloServer, {
            context: async ({ req }) => {
                const user = authenticateGraphQL(req);
                return { user, app };
            },
        })
    );

    // Connect to MongoDB Atlas Cloud Cluster
    await connectDB();

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`Advanced Server listening on http://localhost:${PORT}`);
        console.log(`Cross-Origin Routing allowed for: ${ALLOWED_ORIGIN}`);
        console.log(`GraphQL Engine ready at http://localhost:${PORT}/graphql`);
        console.log(`WebSockets Engine live on ws://localhost:${PORT}`);
    });
}

startAdvancedServer().catch(err => {
    console.error('CRITICAL: Server startup validation failed:', err);
});
