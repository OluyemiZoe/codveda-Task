import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes.js'; 
import productRoutes from './routes/product.routes.js'; 

const app = express();

app.use(cors()); 
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


const frontendBuildPath = path.resolve('../react-frontend/dist');
app.use(express.static(frontendBuildPath));


app.get('/*any', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

export default app;
