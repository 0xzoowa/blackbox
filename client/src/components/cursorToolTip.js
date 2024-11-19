import React, { useState } from "react";

const CursorTooltip = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX + 10,
      y: e.clientY + 10,
    });
  };

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {children}
      {isVisible && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          Click to expand
        </div>
      )}
    </div>
  );
};

export default CursorTooltip;
