import React, { useState, useLayoutEffect } from 'react';

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);
      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }
    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

interface RippleProps {
  duration?: number;
  color?: string;
}

export const Ripple: React.FC<RippleProps> = ({ duration = 850, color = 'rgba(255, 255, 255, 0.3)' }) => {
  const [rippleArray, setRippleArray] = useState<{ x: number; y: number; size: number }[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rippleContainer = e.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
    const x = e.clientX - rippleContainer.x - size / 2;
    const y = e.clientY - rippleContainer.y - size / 2;
    const newRipple = { x, y, size };
    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit z-0" onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'span' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                background: color,
                position: 'absolute',
                borderRadius: '100%',
                transform: 'scale(0)',
                animation: `ripple-animation ${duration}ms linear`,
              }}
            />
          );
        })}
    </div>
  );
};
