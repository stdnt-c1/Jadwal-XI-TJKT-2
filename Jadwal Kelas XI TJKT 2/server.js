import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { AssignmentService } from './db/assignments.js';

// Load environment variables based on NODE_ENV
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: ENV === 'development' ? '.env.development' : '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// API Routes
app.get('/api/assignments', async (req, res) => {
  const { data, error } = await AssignmentService.getAll();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/api/assignments', async (req, res) => {
  const { data, error } = await AssignmentService.create(req.body);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data);
});

app.put('/api/assignments/:id', async (req, res) => {
  const { data, error } = await AssignmentService.update(req.params.id, req.body);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.delete('/api/assignments/:id', async (req, res) => {
  const { error } = await AssignmentService.delete(req.params.id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

// Ensure the /api/db-status endpoint works for all environments
// Enhanced database status endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    const environment = process.env.NODE_ENV || 'development';
    const dbClient = await getDbClient(); // This will test the database connection
    
    // Test the connection
    if (environment === 'development') {
      await dbClient.get('SELECT 1');
    } else {
      await dbClient.from('assignments').select('count').limit(1);
    }
    
    res.json({ 
      environment,
      status: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      environment: 'unknown',
      status: 'disconnected',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running in ${ENV} mode on port ${port}`);
});
