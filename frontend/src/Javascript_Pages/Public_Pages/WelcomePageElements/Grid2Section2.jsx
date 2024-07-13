import React, { useEffect, useRef } from 'react';
import PortfolioGraphic from '../../../Styling_Pages/Public_Pictures/Frame.png';
import '../WelcomePageElements/CSS/Grid2Section2.css';

const Grid2Section2 = React.forwardRef((props, ref) => {
  const graphicRef = useRef(null);

  useEffect(() => {
    const currentGraphicRef = graphicRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentGraphicRef) {
      observer.observe(currentGraphicRef);
    }

    return () => {
      if (currentGraphicRef) {
        observer.unobserve(currentGraphicRef);
      }
    };
  }, []);

  return (
    <section id="section2" ref={ref} className="section">
      <div className="section-content-unique2">
        <h2>Your Portfolio at a Glance</h2>
        <div className="portfolio-graphic-container" ref={graphicRef}>
          <img src={PortfolioGraphic} alt="Portfolio Graphic" className="portfolio-graphic" />
        </div>
      </div>
    </section>
  );
});

export default Grid2Section2;
