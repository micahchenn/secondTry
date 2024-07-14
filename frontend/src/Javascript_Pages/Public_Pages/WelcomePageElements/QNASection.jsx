import React, { useState } from 'react';
import '../WelcomePageElements/CSS/QNASection.css';

const QNASection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    "What is Double?",
    "How does Double work?",
    "Is my money safe with Double?",
    "Can I get my money out when I need it?",
    "How does Double automatically tax loss harvest?"
  ];

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="qna-container">
      <div className="qna-title">Questions & Answers</div>
      <div className="qna-items">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`qna-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleToggle(index)}
          >
            <div className="qna-question">{`+ ${question}`}</div>
            {activeIndex === index && (
              <div className="qna-answer">
                <p>Answer to {question}</p>
              </div>
            )}
            <div className="qna-divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QNASection;
