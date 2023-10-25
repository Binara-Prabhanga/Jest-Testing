import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/recordRoutes'; // Adjust the import path according to your project structure

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Body parser middleware for JSON data

// Routes
app.use('/api/records', router); // Mount the router at /api/records

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
