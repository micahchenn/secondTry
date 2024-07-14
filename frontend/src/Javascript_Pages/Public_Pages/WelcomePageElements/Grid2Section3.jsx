import React from 'react';



const Grid2Section3 = React.forwardRef((props, ref) => (
  <section id="section3" ref={ref} className="section">
    <div className="section-content">
      <h2>Deep Dive into Your Data</h2>
      <p>This is some dummy content for Section 3.</p>
      {/* Add more complex content here */}
    </div>
  </section>
));

export default Grid2Section3;
