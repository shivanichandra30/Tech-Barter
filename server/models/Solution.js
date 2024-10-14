// models/Solution.js
import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    technologyStack: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
