import express from 'express';
import Problem from '../models/ProblemStatement.js';


const router = express.Router();

router.get('/problems', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
