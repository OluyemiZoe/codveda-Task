import app from './src/app.js';
import { connectDB } from './src/config/database.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        
        await connectDB();

        
        app.listen(PORT, () => {
            console.log(` Server successfully listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Server startup aborted: Failed to initialize MongoDB Atlas connection.', error);
        process.exit(1);
    }
}

startServer();
