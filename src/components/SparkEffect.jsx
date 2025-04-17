import React, { useEffect } from 'react';
import '../index.css'; // Make sure this is imported

const SparkEffect = () => {
  const spark = (event) => {
    let i = document.createElement("i");

    // Set the position of the element based on the mouse event
    i.style.left = event.pageX + "px";
    i.style.top = event.pageY + "px";

    // Add random scaling for each element
    i.style.transform = `scale(${Math.random() * 2 + 1})`;

    // Set the custom properties for animation with a slight delay
    i.style.setProperty("--x", getRandomTransitionValue());
    i.style.setProperty("--y", getRandomTransitionValue());

    // Append the element to the body
    document.body.appendChild(i);

    // Remove the element after 2 seconds (adjustable)
    setTimeout(() => {
      document.body.removeChild(i);
    }, 1000);
  };

  const getRandomTransitionValue = () => {
    // Generate random values for movement in both x and y directions
    return `${Math.random() * 50 - 25}px`;
  };

  useEffect(() => {
    document.addEventListener("mousemove", spark);

    return () => {
      document.removeEventListener("mousemove", spark);
    };
  }, []);

  return null;
};

export default SparkEffect;
