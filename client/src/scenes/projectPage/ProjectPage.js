import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ProjectPage.css';
import Navbar from 'scenes/navbar';

const FileItem = ({ name, isDirectory, onClick }) => (
    <div className={`file-item ${isDirectory ? 'directory' : 'file'}`} onClick={onClick}>
      <FontAwesomeIcon icon={isDirectory ? faFolder : faFile} className="file-icon" />
      <span>{name}</span>
    </div>
);

const CodeDisplay = ({ selectedFile }) => {
  let code = '';

  if (selectedFile === 'src/index.js') {
    code = `
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
    `;
  }

  return (
    <div className="code-display">
      {selectedFile ? (
        <pre>{code}</pre>
      ) : (
        <div className="empty-message">Select a file to view code.</div>
      )}
    </div>
  );
};

const ProjectPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    if (file === 'src/') {
      setSelectedFile('src/index.js');
    } else {
      setSelectedFile(file);
    }
  };

  return (
    <Container fluid>
      <Navbar /> 
      <Row>
        <Col md={3} className="file-sidebar">
          <h2>File Hierarchy</h2>
          <FileItem name="src" isDirectory onClick={() => handleFileClick('src/')} />
          <FileItem name="index.js" isDirectory={false} onClick={() => handleFileClick('index.js')} />
          {/* Add more files and directories as needed */}
        </Col>
        <Col md={9}>
          <CodeDisplay selectedFile={selectedFile} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectPage;