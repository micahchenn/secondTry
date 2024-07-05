import React, { useEffect, useState } from 'react';
import '../../Styling_Pages/Static_Elements/LoadingScreen.css';

const LoadingScreen = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const messages = [
      'Loading your data...',
      'Almost there...',
      'Just a moment...',
      'Fetching results...',
      'Hang tight...',
    ];

    let index = 0;
    const interval = setInterval(() => {
      setMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 2200); // Change message every 2.2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen-unique-9">
      <div className="loading-spinner-unique-9"></div>
      <p className="loading-message-unique-9">{message}</p>
    </div>
  );
};

export default LoadingScreen;
