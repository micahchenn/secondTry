import React from 'react';
import '../WelcomePageElements/CSS/Grid2Section4.css';

const Grid2Section4 = React.forwardRef((props, ref) => (
  <section id="section4" ref={ref} className="section">
    <div className="section-content">
      <h2>Meet Quantara, Your AI Assistant</h2>
      <p className="section-description-uniqueS4">Quantara, powered by OpenAI's GPT-4, is an AI-driven investment assistant designed to help you 
        analyze and manage your portfolio effectively. Quantara is capable of conducting comprehensive market analysis and providing tailored investment and portfolio suggestions. 
        Please note that Quantara is currently in beta and may occasionally provide inaccurate information. Any output from Quantara should not be considered investment advice.</p>
      <button className="learn-more-btn-unique">Learn More</button>
      <div className="loader-section4">
        <span className="loader__inner-section4"></span>
        <span className="loader__inner-section4"></span>
      </div>
    </div>
  </section>
));

export default Grid2Section4;
