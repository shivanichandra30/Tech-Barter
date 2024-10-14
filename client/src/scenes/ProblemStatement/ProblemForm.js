import React, { Component } from 'react';
import './problemForm.css';
class SolutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: '',
      techStack: '',
    };
  }

  handleSolutionChange = (e) => {
    this.setState({ solution: e.target.value });
  };

  handleTechStackChange = (e) => {
    this.setState({ techStack: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // You can handle solution submission here, e.g., send the data to your server.
    const { solution, techStack } = this.state;
    console.log('Solution:', solution);
    console.log('Tech Stack:', techStack);
    // Reset the form fields if needed
    this.setState({ solution: '', techStack: '' });
  };

  render() {
    return (

      <div className='solution-form-parent'>
        <div className='solution-form'>
        <h2>Add a Solution</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='sol-desc'>
            <label htmlFor="solution">Solution:</label>
            <textarea
              id="solution"
              value={this.state.solution}
              onChange={this.handleSolutionChange}
              placeholder="Enter your solution here"
              required
            />
          </div>
          <div className='sol-desc'>
            <label htmlFor="techStack">Technology Stack:</label>
            <textarea
              id="techStack"
              value={this.state.techStack}
              onChange={this.handleTechStackChange}
              placeholder="Enter the technology stack used"
              required
            />
          </div>
          <div className='sol-submit-btn'>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default SolutionForm;
