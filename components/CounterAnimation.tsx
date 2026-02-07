import React, { useEffect, useState } from 'react';
import './animations.css';

const CounterAnimation: React.FC = () => {
  const [count, setCount] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const target = 150;
    const duration = 1800; // 1.8 seconds

    const easeOutQuad = (t: number) => t * (2 - t);

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const easedPercentage = easeOutQuad(percentage);
      const currentCount = Math.ceil(target * easedPercentage);

      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => setShowSubtitle(true), 200);
      }
    };

    requestAnimationFrame(step);

  }, []);

  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-gray-800">
        24 saatda<span className="text-blue-600"> {count}+</span>CV yaradıldı
      </p>
      {showSubtitle && (
        <p className="text-sm text-gray-500 animate-fade-in">
          İlk işinə bir addım
        </p>
      )}
    </div>
  );
};

export default CounterAnimation;
