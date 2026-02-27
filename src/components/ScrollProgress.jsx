import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setWidth((window.scrollY / windowHeight) * 100);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}
