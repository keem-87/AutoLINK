import React, { useEffect, useState } from 'react';
import axios from 'axios';

// The main App component acts as the root of the React frontend.
// It fetches a greeting message from the backend when mounted.
// In a production environment, authentication tokens would be sent via headers.
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Example API call to the backend. The backend should expose an endpoint
    // such as /api/hello or /api/profile. Replace '/api/hello' with a real route.
    axios.get('/api/hello')
      .then((res) => {
        // Update state with the response data
        setMessage(res.data.message || 'Welcome to The Shelter‑Stead!');
      })
      .catch((err) => {
        // Fallback message on error
        setMessage('Welcome to The Shelter‑Stead!');
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>The Shelter‑Stead</h1>
      <p>{message}</p>
      {/* Additional UI components (service listings, booking forms, etc.) will be added here. */}
    </div>
  );
}

export default App;
