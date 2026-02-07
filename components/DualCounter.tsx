import React, { useEffect, useState, useRef } from 'react';
import './animations.css';

const DualCounter: React.FC = () => {
  const [counts, setCounts] = useState([0, 0]);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if(ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      const targets = [3000, 5000];
      const duration = 6000;

      const easeOutQuad = (t: number) => t * (2 - t);
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        const easedPercentage = easeOutQuad(percentage);

        setCounts(targets.map(target => Math.ceil(target * easedPercentage)));

        if (percentage < 1) {
          requestAnimationFrame(step);
        } else {
            setCounts(targets); // Ensure it ends on the exact number
          setTimeout(() => setShowSubtitle(true), 250);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} className="text-center my-10">
      <div className="flex justify-center gap-12 md:gap-20">
        <div className="text-white">
          <p className="text-5xl md:text-6xl font-extrabold">{counts[0]}+ Diplom</p>
        </div>
        <div className="text-white">
          <p className="text-5xl md:text-6xl font-extrabold">{counts[1]}+ Dizayn</p>
        </div>
      </div>
      {showSubtitle && (
        <p className="text-lg md:text-xl opacity-90 font-light mt-8 animate-fade-in">
          Yüksək keyfiyyətli materiallar, rəsmi dizayn və sürətli icra
        </p>
      )}
    </div>
  );
};

export default DualCounter;
