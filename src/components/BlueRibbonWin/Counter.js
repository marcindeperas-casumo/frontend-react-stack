import React from "react";
import './Counter.scss';

// for more easing functions see: https://gist.github.com/gre/1650294 or similar resource
const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;

const useAnimationFrame = callback => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const animate = time => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime * easeInOutQuad(1));
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    React.useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
  }

  export const Counter = () => {
    const [count, setCount] = React.useState(0)

    useAnimationFrame(deltaTime => {
      // fake currency value which just counts up to 10000
      setCount(prevCount => (prevCount + deltaTime * 0.01) % 10000);
    })

    return <div className='jackpot-value'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(count)}</div>
  }
