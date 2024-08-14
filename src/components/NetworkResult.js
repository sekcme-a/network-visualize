import React, { useEffect, useState, useRef } from 'react';
import { cytoscapeStyle } from '@/data/styles';
import style from "./NetworkResult.module.css";
import CytoscapeComponent from 'react-cytoscapejs';
import cola from 'cytoscape-cola';
import Cytoscape from 'cytoscape';
import NodeInfo from './NodeInfo';
import EdgeInfo from './EdgeInfo';
import dagre from 'cytoscape-dagre';
import coseBilkent from 'cytoscape-cose-bilkent';
import LayoutSelector from './LayoutSelector';
import SliderControl from './SliderControl';
import FilterEdgeType from './FilterEdgeType';
import { kmeans } from 'ml-kmeans';
import Clustering from './filter/Clustering';
import { TextField } from '@mui/material';

Cytoscape.use(cola);
Cytoscape.use(dagre);
Cytoscape.use(coseBilkent);

const NetworkResult = ({ edges, nodes }) => {
  const width = "100%";
  const height = "500px";
  const maxZoom = 2.5;
  const minZoom = 0.5;

  const [edgeLength, setEdgeLength] = useState(200);
  const [nodeSpacing, setNodeSpacing] = useState(10);
  const [nodeList, setNodeList] = useState(nodes);
  const [edgeList, setEdgeList] = useState(edges);
  const [selectedType, setSelectedType] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [selectedEdgeType, setSelectedEdgeType] = useState([
    "combined_score",
    "neighborhood_on_chromosome",
    "gene_fusion",
    "phylogenetic_cooccurrence",
    "homology",
    "coexpression",
    "experimentally_determined_interaction",
    "database_annotated",
    "automated_textmining"
  ]);
  const [filterEdgeByScore, setFilterEdgeByScore] = useState({
    combined_score: { min: 0, max: 1 },
    neighborhood_on_chromosome: { min: 0, max: 1 },
    gene_fusion: { min: 0, max: 1 },
    phylogenetic_cooccurrence: { min: 0, max: 1 },
    homology: { min: 0, max: 1 },
    coexpression: { min: 0, max: 1 },
    experimentally_determined_interaction: { min: 0, max: 1 },
    database_annotated: { min: 0, max: 1 },
    automated_textmining: { min: 0, max: 1 }
  });

  const [layoutName, setLayoutName] = useState("cola");

  const [cluster, setCluster] = useState("none")
  const [kCount, setKCount] = useState(3)

  const cyRef = useRef(null); // Reference to Cytoscape instance

  const onEdgeLengthChange = (e) => {
    setEdgeLength(parseInt(e.target.value));
  };
  const onNodeSpacingChange = (e) => {
    setNodeSpacing(parseInt(e.target.value));
  };

  const layout = {
    name: layoutName,
    nodeSpacing: (node) => nodeSpacing,
    edgeLength: edgeLength,
    maxSimulationTime: 2000,
    ...(layoutName === 'dagre'  && {
      nodeSep: 3,  // 노드 간 최소 간격
      edgeSep: 3,  // 엣지 간 최소 간격
      rankSep: 3,  // 계층 간 최소 간격
    }),
  };

  useEffect(() => {
    let selectedNodes = nodes
    let selectedEdges = edges.filter(edge => selectedEdgeType.includes(edge.data.type));
    selectedEdges = selectedEdges.filter(edge => parseFloat(edge.data.score) >= filterEdgeByScore[edge.data.type].min && parseFloat(edge.data.score) <= filterEdgeByScore[edge.data.type].max);
    setEdgeList(selectedEdges);
    console.log(nodes)
    console.log(selectedEdges)
    if(cluster==="none"){
      if (!cyRef.current) return;
      const cy = cyRef.current;
      cy.nodes().forEach((node, index) => {
        node.data('cluster', null);
        node.style('background-color', "rgb(230,230,230)"); // Apply color based on cluster
  
      });
    }

  }, [selectedEdgeType, filterEdgeByScore, cluster]);

  // K-means clustering function based on centrality
  const performKMeansClustering = (k = 3) => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    // Calculate degree centrality for all nodes
    const degreeCentrality = cy.elements().degreeCentralityNormalized();
    const centralityValues = cy.nodes().map(node => [degreeCentrality.degree(node)]);

    // Log the centrality values for debugging
    console.log("Centrality values for nodes:", centralityValues);

    // Perform k-means clustering on centrality values with k-means++ initialization and fixed random state
    const kmeansOptions = { initialization: 'kmeans++', maxIterations: 1000 };
    const result = kmeans(centralityValues, k, kmeansOptions);

    // Extract clusters from the result
    const clusters = result.clusters;

    // Log cluster results for debugging
    console.log("K-means clustering result:", result);
    console.log("Clusters assigned to nodes:", clusters);

    // Assign cluster information to nodes
    cy.nodes().forEach((node, index) => {
      node.data('cluster', clusters[index]);
      node.style('background-color', getClusterColor(clusters[index])); // Apply color based on cluster

      // Log the cluster assignment for each node
      // console.log(`Node ${node.id()} assigned to cluster ${clusters[index]}`);
    });
  };

  // Helper function to get color based on cluster index
  const getClusterColor = (cluster) => {
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#6A5ACD'];
    return colors[cluster % colors.length];
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.leftContainer}>
        <div className={style.cytoscape__container}>
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements({ nodes: nodeList, edges: edgeList })}
            style={{ width: width, height: height }}
            stylesheet={[...cytoscapeStyle]}
            maxZoom={maxZoom}
            minZoom={minZoom}
            autounselectify={false}
            boxSelectionEnabled={true}
            layout={layout}
            cy={(cy) => {
              cyRef.current = cy; // Store Cytoscape instance in ref

              cy.on('tap', 'node', function (evt) {
                setSelectedType("node"); setSelectedId(evt.target.id());
              });
              cy.on('tap', 'edge', function (evt) {
                setSelectedType("edge"); setSelectedId(evt.target.id());
              });

              // 중심성 측정
              const degreeCentrality = cy.elements().degreeCentralityNormalized();
              cy.nodes().forEach(node => {
                const centrality = degreeCentrality.degree(node);
                node.style('fontSize', 8);
                node.style('width', centrality * 40 > 25 ? centrality * 40 : 25);
                node.style('height', centrality * 40 > 25 ? centrality * 40 : 25);
              });
            }}
          />
        </div>
      </div>
      <div className={style.rightContainer}>
        {layoutName === "cola" &&
          <SliderControl
            edgeLength={edgeLength}
            onEdgeLengthChange={onEdgeLengthChange}
            nodeSpacing={nodeSpacing}
            onNodeSpacingChange={onNodeSpacingChange}
          />
        }
        <LayoutSelector layoutName={layoutName} setLayoutName={setLayoutName} />
        <FilterEdgeType {...{ selectedEdgeType, setSelectedEdgeType, filterEdgeByScore, setFilterEdgeByScore }} />

      
        {/* <button onClick={() => performKMeansClustering(3)}>Perform K-Means Clustering</button> */}
        {/* <Clustering performKMeansClustering={performKMeansClustering} /> */}
        <p>Clustering</p>

        <div style={{display:"flex", alignItems:"center"}}>
          <input
            type="radio"
            value="kmeans"
            checked={cluster==="kmeans"}
            onClick={()=>{
              setCluster(prev => {
                if(prev==="kmeans") return "none"
                else {
                  performKMeansClustering(parseInt(kCount))
                  return "kmeans"
                }
              });
            }}
          />
          k-means

          <TextField
            size="small"
            sx={{ml: "10px"}}
            value={kCount}
            onChange={(e) => setKCount(e.target.value)}
            label="Number of clusters"
          />

        </div>
        {/* <div style={{display:"flex", alignItems:"center", marginTop: "10px"}}>
          <input
            type="radio"
            value="dbscan"
            checked={cluster==="dbscan"}
            onClick={()=>{
              setCluster(prev => {
                if(prev==="dbscan") return "none"
                else {
                  performKMeansClustering(parseInt(2))
                  return "dbscan"
                }
              });
            }}
          />
          dbscan

          <TextField
            size="small"
            sx={{ml: "10px"}}
            value={kCount}
            onChange={(e) => setKCount(e.target.value)}
            label="parameter"
          />

        </div> */}

      </div>
      {selectedType === "node" && <NodeInfo id={selectedId} data={{ nodes, edges }} />}
      {selectedType === "edge" && <EdgeInfo id={selectedId} data={{ nodes, edges }} />}
    </div>
  );
}

export default React.memo(NetworkResult);
