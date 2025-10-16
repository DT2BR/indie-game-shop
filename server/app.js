import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối PostgreSQL qua Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

// Middleware
app.use(cors());
app.use(express.json());

// Test  server có chạy không
app.get('/', (req, res) => {
  res.send('✅ Clappy Birb Scoreboard API is runing fine!');
});


// POST /api/score → thêm điểm mới

app.post('/api/score', async (req, res) => {
  try {
    const { player_name, score } = req.body;

    if (
      !player_name ||
      player_name.trim().length === 0 ||
      player_name.trim().length > 5
    ) {
      return res.status(400).json({ error: 'Name must have 1 to 5 letters' });
    }
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'score must be positive' });
    }

    await pool.query(
      `INSERT INTO scoreboard (player_name, score) VALUES ($1, $2);`,
      [player_name.trim(), score]
    );

    res.status(201).json({ message: 'save score successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error while saving' });
  }
});


// GET /api/leaderboard → lấy top 5 điểm cao nhất

app.get('/api/leaderboard', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT player_name, score, created_at
       FROM scoreboard
       ORDER BY score DESC, created_at ASC
       LIMIT 5;`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    
  }
});


// Chạy server

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
