import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    company: String,
    statement: String,
    description: String,
  });
  
  const Problem = mongoose.model('Problem', problemSchema);

  export default Problem;