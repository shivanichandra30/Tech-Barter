import React, { useState, useEffect } from "react";
import "./ProblemStatement.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProblemStatement = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode);

  useEffect(() => {
    fetch("http://localhost:3001/api/problems") // Adjust URL as needed
      .then((response) => response.json())
      .then((data) => {
        setProblems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const redirectToProblemDetail = (problem) => {
    // Navigate to the SolutionForm and pass the company name and problem statement
    navigate(`/problem/solution-form`, {
      state: {
        company: problem.company,
        statement: problem.statement,
        description: problem.description,
      },
    });
  };

  return (
    <div
      className={`problem-statement-parent ${
        mode === "dark" ? "dark-mode" : ""
      }`}
    >
      {problems.map((problem, index) => (
        <div
          key={index}
          className={`problem-container ${problem.expanded ? "expanded" : ""}`}
        >
          <div
            className="problem-statement"
            onClick={() => redirectToProblemDetail(problem)}
          >
            <h3>{problem.company}</h3>
            <p>{problem.statement}</p>
            <p>{problem.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemStatement;
