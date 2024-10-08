import React from "react";

function DotIcon({ color = "#666666" }) {
  return (
    <div>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.08667" cy="6.59119" r="6" fill={color} />
      </svg>
    </div>
  );
}

export default DotIcon;
