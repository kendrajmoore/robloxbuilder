import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './custom.css';  

const BuilderForm = () => {
  const [template, setTemplate] = useState('Classic Obby');
  const [idea, setIdea] = useState('');
  const [script, setScript] = useState('');

  const handleGenerate = async () => {
    const response = await fetch("https://roblox-backend-km.azurewebsites.net/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ template, idea }),
    });
  
    const data = await response.json();
    setScript(data.script);
  };
 
  return (
    <Container className="p-4 custom-container">
      <h2 className="text-center mb-4">🎮 Roblox Game Part Builder</h2>

      <Card className="p-3 custom-card">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Choose a Game Template</Form.Label>
            <Form.Select value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option>Classic Obby</option>
              <option>Racing</option>
              <option>Platformer</option>
              <option>Laser Tag</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Game Idea</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. spooky lava maze"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </Form.Group>

          <Button className="w-100 custom-btn" onClick={handleGenerate}>
            Generate Lua Script
          </Button>
        </Form>
      </Card>

      {script && (
        <Card className="mt-4 p-3 custom-output">
          <pre>{script}</pre>
        </Card>
      )}
    </Container>
  );
};

export default BuilderForm;