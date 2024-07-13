import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../WelcomePageElements/CSS/GridTwo.css';
import Grid2Section1 from './Grid2Section1';
import Grid2Section2 from './Grid2Section2';
import Grid2Section3 from './Grid2Section3';
import Grid2Section4 from './Grid2Section4';
import test from '../../../Styling_Pages/Public_Pictures/Circle_Blur.png';
import test2 from '../../../Styling_Pages/Public_Pictures/Circle_Blur2.png';

gsap.registerPlugin(ScrollTrigger);

const GridTwo = () => {
  const sectionsRef = useRef([]);
  const navRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(test);

  useEffect(() => {
    const sections = sectionsRef.current;
    const navLinks = navRef.current.querySelectorAll('a');

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          navLinks[index].classList.add('active');
          gsap.to(section.querySelector('.section-content'), { y: 0, opacity: 1, duration: 0.5 });
          setBackgroundImage(index % 2 === 0 ? test2 : test2); // Change background image based on section index
        },
        onLeaveBack: () => {
          navLinks[index].classList.remove('active');
          gsap.to(section.querySelector('.section-content'), { y: 50, opacity: 0, duration: 0.5 });
        },
        onLeave: () => {
          navLinks[index].classList.remove('active');
          gsap.to(section.querySelector('.section-content'), { y: -50, opacity: 0, duration: 0.5 });
        },
        onEnterBack: () => {
          navLinks[index].classList.add('active');
          gsap.to(section.querySelector('.section-content'), { y: 0, opacity: 1, duration: 0.5 });
          setBackgroundImage(index % 2 === 0 ? test2 : test2); // Change background image based on section index
        },
      });
    });

    // Responsive design: Adjust layout on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="grid-two" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav ref={navRef} className="sticky-nav">
        <h2>Empower Your Investments with Harbinger</h2>
        <ul>
          <li>
            <a href="#section1">Connect Your Financial Accounts</a>
            <p className="nav-subtitle">Easily link your bank and investment accounts</p>
          </li>
          <li>
            <a href="#section2">Your Portfolio at a Glance</a>
            <p className="nav-subtitle">See all your investments in one place</p>
          </li>
          <li>
            <a href="#section3">Deep Dive into Your Data</a>
            <p className="nav-subtitle">Analyze your portfolio with detailed metrics</p>
          </li>
          <li>
            <a href="#section4">Get AI Generated Advice</a>
            <p className="nav-subtitle">Receive insights and suggestions from Quantara</p>
          </li>
        </ul>
      </nav>
      <div className="sections-container">
        <Grid2Section1 ref={(el) => (sectionsRef.current[0] = el)} />
        <Grid2Section2 ref={(el) => (sectionsRef.current[1] = el)} />
        <Grid2Section3 ref={(el) => (sectionsRef.current[2] = el)} />
        <Grid2Section4 ref={(el) => (sectionsRef.current[3] = el)} />
      </div>
    </div>
  );
};

export default GridTwo;
