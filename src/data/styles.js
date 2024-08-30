export const cytoscapeStyle = [
  {
    selector: "node",
    css: {
      label: "data(label)",
      "border-opacity": 1.0,
      "background-opacity": 1.0,
      "text-opacity": 1.0,
      width: 45.0,
      "text-valign": "center",
      "text-halign": "center",
      color: "black",
      "font-family": "SansSerif.plain",
      "font-weight": "normal",
      "background-color": "rgb(230, 230, 230)",
      "border-color": "rgb(149, 149, 149)",
      shape: "ellipse",
      height: 45.0,
      "font-size": 10,
      "border-width": 0.5,
      'label': 'data(label)',
      'width': 'data(size)',
      'height': 'data(size)'
    }
  },
  {
    selector: "node:selected",
    css: {
      "border-width": "6px",
      "border-color": "#000000",
      "border-opacity": "0.5",
      "background-color": "#c9c9c9",
      "text-outline-color": "#77828C"
    }
  },
  {
    selector: "edge",
    css: {
      "text-opacity": 1.0,
      "target-arrow-shape": "none",
      "target-arrow-color": "rgb(0,0,0)",
      content: "",
      width: 1.0,
      "font-family": "Dialog.plain",
      "font-weight": "normal",
      "line-color": "rgb(31,41,61)",
      "font-size": 10,
      opacity: 1.0,
      // color: "rgb(0,0,0)",
      // "line-style": "solid",
      // "source-arrow-shape": "none",
      // "source-arrow-color": "rgb(0,0,0)",
      "curve-style": "bazier",
      "haystack-radius": ".3",
      "overlay-padding": "2px",
      cursor: "pointer"
    }
  },
  {
    selector: 'edge[type="combined_score"]',
    css: {
      lineColor:"rgb(128,0,128)",
    }
  },
  {
    selector: 'edge[type="neighborhood_on_chromosome"]',
    css: {
      lineColor:"rgb(200,0,200)",
    }
  },
  {
    selector: 'edge[type="gene_fusion"]',
    css: {
      lineColor:"rgb(0,160,200)",
    }
  },
  {
    selector: 'edge[type="phylogenetic_cooccurrence"]',
    css: {
      lineColor:"rgb(170,200,0)",
    }
  },
  {
    selector: 'edge[type="homology"]',
    css: {
      lineColor: "rgb(255,165,0)" // Orange
    }
  },
  {
    selector: 'edge[type="coexpression"]',
    css: {
      lineColor: "rgb(0,128,0)" // Green
    }
  },
  {
    selector: 'edge[type="experimentally_determined_interaction"]',
    css: {
      lineColor: "rgb(255,69,0)" // Red Orange
      
    }
  },
  {
    selector: 'edge[type="database_annotated"]',
    css: {
      lineColor: "rgb(0,0,255)" // Blue
    }
  },
  {
    selector: 'edge[type="automated_textmining"]',
    css: {
      lineColor: "rgb(35, 35, 35)" // Dark Purple
    }
  },
  
  




  {
    selector: "edge[score = 1]",
    css: {
      width: 2.5
    }
  },
  {
    selector: "edge[score > 0.9][score < 1]",
    css: {
      width: 2.3
    }
  },
  {
    selector: "edge[score = 0.9]",
    css: {
      width: 2,
    }
  },
  {
    selector: "edge[score > 0.8][score < 0.9]",
    css: {
      width: 2
    }
  },
  {
    selector: "edge[score = 0.8]",
    css: {
      width: 1.7
    }
  },
  {
    selector: "edge[score > 0.7][score < 0.8]",
    css: {
      width: 1.7
    }
  },
  {
    selector: "edge[score = 0.7]",
    css: {
      width: 1.5
    }
  },
  {
    selector: "edge[score > 0.6][score < 0.7]",
    css: {
      width: 1.5
    }
  },
  {
    selector: "edge[score = 0.6]",
    css: {
      width: 1.3
    }
  },
  {
    selector: "edge[score > 0.5][score < 0.6]",
    css: {
      width: 1.3
    }
  },
  {
    selector: "edge[score = 0.5]",
    css: {
      width: 1.0
    }
  },
  {
    selector: "edge[score < 0.5]",
    css: {
      width: 1.0
    }
  },
 
  {
    selector: "edge:selected",
    css: {
      "line-color": "rgb(164, 0, 181)"
    }
  }
];
