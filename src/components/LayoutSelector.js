import React from 'react';

const LayoutSelector = ({ layoutName, setLayoutName }) => {
  return (
    <div>
      <p style={{marginBottom:"5px"}}>Layout</p>
      <label>
        <input
          type="radio"
          value="cola"
          checked={layoutName === "cola"}
          onChange={() => setLayoutName("cola")}
        />
        Cola
      </label>
      <label style={{marginLeft:"15px"}}>
        <input
          type="radio"
          value="grid"
          checked={layoutName === "grid"}
          onChange={() => setLayoutName("grid")}
        />
        Grid
      </label>
      <label style={{marginLeft:"15px"}}>
        <input
          type="radio"
          value="circle"
          checked={layoutName === "circle"}
          onChange={() => setLayoutName("circle")}
        />
        Circle
      </label>
      <div style={{height:"5px"}}/>
      <label >
        <input
          type="radio"
          value="dagre"
          checked={layoutName === "dagre"}
          onChange={() => setLayoutName("dagre")}
        />
        Dagre
      </label>
      {/* <label style={{marginLeft:"15px"}}>
        <input
          type="radio"
          value="cose-bilkent"
          checked={layoutName === "cose-bilkent"}
          onChange={() => setLayoutName("cose-bilkent")}
        />
        Cose-Bilkent
      </label> */}
      <label style={{marginLeft:"15px"}}>
        <input
          type="radio"
          value="concentric"
          checked={layoutName === "concentric"}
          onChange={() => setLayoutName("concentric")}
        />
        Concentric
      </label>
    </div>
  );
};

export default LayoutSelector;
