import React from 'react';

const SliderControl = ({ edgeLength, onEdgeLengthChange, nodeSpacing, onNodeSpacingChange }) => {
  return (
    <div style={{display:"flex", marginBottom:"10px", alignItems:"center"}}>
        <p style={{fontSize:"15px", marginRight:"5px"}}>Edge Length</p>
        <input
          type="range"
          id="edgeLength"
          name="edgeLength"
          min="1"
          max="500"
          onChange={onEdgeLengthChange}
          value={edgeLength}
        />
        <p style={{fontSize:"15px", marginRight:"5px", marginLeft:"30px"}}>Node Spacing</p>
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
  );
};

export default SliderControl;
