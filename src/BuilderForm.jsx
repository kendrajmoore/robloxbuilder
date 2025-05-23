import React, { useState } from 'react';
import './custom.css';  


export default function BuilderForm({ setScript }) {
  const [selectedIdea, setSelectedIdea] = useState("lava");

  const handleGenerate = async () => {
    const response = await fetch("https://roblox-backend-km.azurewebsites.net/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: "Classic Obby",
        idea: selectedIdea,
      }),
    });

    const data = await response.json();
    setScript(data.script);
  };

  return (
    <div>
      <label htmlFor="idea">Choose a block type:</label>
      <select
        id="idea"
        value={selectedIdea}
        onChange={(e) => setSelectedIdea(e.target.value)}
      >
        <option value="lava">Lava</option>
        <option value="ice">Ice</option>
        <option value="spike">Spike</option>
      </select>
      <button onClick={handleGenerate}>Generate Lua Script</button>
    </div>
  );
}