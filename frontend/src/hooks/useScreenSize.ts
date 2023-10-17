import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { width, height };
};

export default useScreenSize;