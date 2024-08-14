import React from 'react';

const SliderControl = ({ edgeLength, onEdgeLengthChange, nodeSpacing, onNodeSpacingChange }) => {
  return (
    <div style={{display:"flex", marginBottom:"5px"}}>
      <div>
        <p style={{fontSize:"15px", marginBottom:"5px"}}>Edge Length</p>
        <input
          type="range"
          id="edgeLength"
          name="edgeLength"
          min="1"
          max="500"
          onChange={onEdgeLengthChange}
          value={edgeLength}
        />
      </div>
      <div style={{marginLeft:"20px"}}>
        <p style={{fontSize:"15px", marginBottom:"5px"}}>Node Spacing</p>
        <input
          type="range"
          id="nodeSpacing"
          name="nodeSpacing"
          min="1"
          max="100"
          onChange={onNodeSpacingChange}
          value={nodeSpacing}
        />
      </div>
    </div>
  );
};

export default SliderControl;
