// routes/solutions.js
import express from "express";
import Solution from "../models/Solution.js"; // Ensure this path is correct

const router = express.Router();

// POST route for submitting a solution
router.post("/submit-solution", async (req, res) => {
  const { companyName, problem, description, solution, technologyStack } =
    req.body;

  console.log("Request body:", req.body); // Log incoming data for debugging

  try {
    const newSolution = new Solution({
      companyName,
      problem,
      description,
      solution,
      technologyStack,
    });
    await newSolution.save();
    res
      .status(201)
      .json({ message: "Solution submitted successfully", newSolution });
  } catch (error) {
    console.error("Error saving solution:", error);
    res.status(500).json({ message: "Error submitting solution", error });
  }
});

export default router; // Ensure you are using 'export default'
