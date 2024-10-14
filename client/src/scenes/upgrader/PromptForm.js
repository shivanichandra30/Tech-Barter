import React, { Component } from 'react';
import './promptForm.css';

class PromptForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: '',
      transformedCode: '',
      loading: false,
    };
  }

  handlePromptChange = (e) => {
    this.setState({ prompt: e.target.value });
  };

  handleCopyClick = () => {
    const { transformedCode } = this.state;
    const textArea = document.createElement('textarea');
    textArea.value = transformedCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      // Simulate a delay (you would replace this with an API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assuming this is the transformation function
      const transformedCode = this.transformCode(this.state.prompt);

      this.setState({ transformedCode });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  transformCode = (inputCode) => {
    return (
      `import React from 'react';
  
  const Header = () => {
    return (
      <header>
        <h1>Hello, World!</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    );
  };
  
  const Section = () => {
    return (
      <section>
        <h2>Section Heading</h2>
        <p>This is a sample section.</p>
      </section>
    );
  };
  
  const Footer = () => {
    return (
      <footer>
        <p>&copy; 2023 My Website</p>
      </footer>
    );
  };
  
  const App = () => {
    return (
      <div>
        <Header />
        <Section />
        <Footer />
      </div>
    );
  };
  
  export default App;`
    );
  };
  
  

  render() {
    return (
      <div>
        <div className='comparator-container'>
          <form className='mysolution' onSubmit={this.handleSubmit}>
            <h3>Your Solution:</h3>
            <textarea
              id="prompt"
              value={this.state.prompt}
              onChange={this.handlePromptChange}
              placeholder="Enter your solution here"
              required
              rows={4}
            />
            <div className='optimize-btn'>
              <button type="submit">Optimize</button>
            </div>
          </form>
          <div className='optimizedSol'>
            <h3>Optimized Solution:</h3>
            <button className='copy-btn' onClick={this.handleCopyClick}>Copy</button>
            {this.state.loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <textarea
                readOnly
                value={this.state.transformedCode}
                rows={10}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PromptForm;
