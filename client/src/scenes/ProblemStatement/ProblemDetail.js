import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom"; // To retrieve passed state
import Navbar from "scenes/navbar";
import "./problemForm.css";
import UserWidget from "scenes/widgets/UserWidget";
import { useSelector } from "react-redux";

const SolutionForm = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  const location = useLocation(); // Access passed data via useLocation
  const { company, statement, description } = location.state || {}; // Default to empty if undefined
  const [solution, setSolution] = useState("");
  const [techStack, setTechStack] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const submissionData = {
      companyName: company,
      problem: statement,
      description: description,
      solution: solution,
      technologyStack: techStack,
    };

    console.log("Submitting data:", submissionData); // Log the submission data

    try {
      const response = await fetch(
        "http://localhost:3001/api/submit-solution",
        {
          // Change to port 3001
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      console.log("Response status:", response.status); // Log the response status
      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      if (response.ok) {
        console.log("Success:", data);
        // Reset form fields after submission
        setSolution("");
        setTechStack("");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f6f8",
        }}
      >
        <Box flexBasis="23%" marginLeft={"50px"}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Container maxWidth="md" className="solution-form-parent">
          <Box
            className="solution-form"
            sx={{
              padding: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h2" gutterBottom>
              <center>
                <b>Submit Your Solution</b>
              </center>
            </Typography>
            <Typography variant="h3" gutterBottom>
              Company: {company || "N/A"} {/* Display company name */}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Problem: {statement || "N/A"} {/* Display problem statement */}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Description: {description || "N/A"}{" "}
              {/* Display problem description */}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  fullWidth
                  id="solution"
                  label="Solution"
                  multiline
                  rows={4}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Enter your solution here"
                  variant="outlined"
                  required
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  fullWidth
                  id="techStack"
                  label="Technology Stack"
                  multiline
                  rows={2}
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="Enter the technology stack used"
                  variant="outlined"
                  required
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default SolutionForm;
