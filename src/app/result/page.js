"use client"

import styles from "@/components/result/index.module.css"
import React, { useEffect, useState, useRef, useContext } from 'react';
import { MyContext } from "@/context/data";
import { cytoscapeStyle } from '@/data/styles';
import CytoscapeComponent from 'react-cytoscapejs';
import cola from 'cytoscape-cola';
import Cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import coseBilkent from 'cytoscape-cose-bilkent';
import { kmeans } from 'ml-kmeans';
import Header from "@/components/result/Header";
import Menu from "@/components/result/Menu";
import Input from "@/components/result/Input";
import Select from "@/components/result/Select";
import Layout from "@/components/result/layout/Layout";
import Filter from "@/components/result/filter/Filter";
import Clustering from "@/components/result/filter/Clustering";



Cytoscape.use(cola);
Cytoscape.use(dagre);
Cytoscape.use(coseBilkent);

const Result = () => {
  const {edges, nodes} = useContext(MyContext)

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

  const [selectedMenu, setSelectedMenu] = useState("Input")

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

  return(
    <div className={styles.background_container}>
      <Header />


      <div className={styles.cytoscape_container}>
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
              setSelectedMenu("Select")
            });
            cy.on('tap', 'edge', function (evt) {
              setSelectedType("edge"); setSelectedId(evt.target.id());
              setSelectedMenu("Select")
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

        
      <Menu {...{selectedMenu, setSelectedMenu}}/>
      
      <div style={{display:"flex", justifyContent:"center", width:"100%", paddingBottom:"50px"}}>
        <div style={{width:"70%"}}>
          {selectedMenu==="Input" && <Input />}
          {selectedMenu==="Select" && <Select {...{selectedType, selectedId}} />}
          {selectedMenu==="Layout" && <Layout {...{layoutName, setLayoutName, edgeLength, onEdgeLengthChange, nodeSpacing, onNodeSpacingChange}} />}
          {selectedMenu==="Filter" && <Filter {...{ selectedEdgeType, setSelectedEdgeType, filterEdgeByScore, setFilterEdgeByScore }}  />}
          {selectedMenu==="Cluster" && <Clustering {...{performKMeansClustering, cluster, setCluster}} />}
        </div>
      </div>
    </div>
  )
}

export default Result
