import React, { useState } from 'react';
import api from '../../api';  // Assuming you have a configured api instance

function TestLangchain() {
  const [responseData, setResponseData] = useState(null);
  const [query, setQuery] = useState('');

  // Inline styles for centering
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Use the full viewport height
    flexDirection: 'column', // Stack children vertically
  };

  const sendTestRequest = async () => {
    try {
      const response = await api.post('/langchain/stock-analysis/', {
        input: query,
        chat_history: [],
      });
      setResponseData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error making request', error);
    }
  };

  return (
    <div style={centerStyle}>
      <h1>TestLangchain</h1>
      <p>This is centered in the middle of the page.</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      <button onClick={sendTestRequest}>Send Request</button>
      {responseData && (
        <pre style={{ maxHeight: '500px', overflowY: 'scroll', marginTop: '20px' }}>
          {responseData}
        </pre>
      )}
    </div>
  );
}

export default TestLangchain;
